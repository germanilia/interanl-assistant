from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.core.jwt_utils import jwt_validator
from app.models.user import UserRole
from app.crud.user import UserDAO
from app.services.user_service import UserService
from app.schemas.auth import TokenData
from app.schemas.user import UserResponse

# Security scheme
security = HTTPBearer()


def get_db() -> Generator:
    """
    Dependency for database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user_dao() -> UserDAO:
    """
    Dependency for UserDAO instance.
    """
    return UserDAO()


def get_user_service(user_dao: UserDAO = Depends(get_user_dao)) -> UserService:
    """
    Dependency for UserService instance.
    """
    return UserService(user_dao)


async def get_current_user_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> TokenData:
    """
    Dependency to get current user token data from JWT.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        token = credentials.credentials
        token_data = jwt_validator.validate_token(token)

        if token_data.username is None and token_data.user_sub is None:
            raise credentials_exception

        return token_data
    except Exception:
        raise credentials_exception


async def get_current_user(
    token_data: TokenData = Depends(get_current_user_token),
    db: Session = Depends(get_db),
    user_service: UserService = Depends(get_user_service)
) -> UserResponse:
    """
    Dependency to get current user from database.
    Returns UserResponse (Pydantic model) instead of SQLAlchemy model.
    """
    user = None

    # Try to find user by cognito_sub first, then by username
    if token_data.user_sub:
        user = user_service.get_user_by_cognito_sub(db, cognito_sub=token_data.user_sub)

    if not user and token_data.username:
        user = user_service.get_user_by_username(db, username=token_data.username)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )

    return user


async def get_current_active_user(
    current_user: UserResponse = Depends(get_current_user)
) -> UserResponse:
    """
    Dependency to get current active user.
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user


async def get_current_admin_user(
    current_user: UserResponse = Depends(get_current_active_user)
) -> UserResponse:
    """
    Dependency to get current admin user.
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user


def require_role(required_role: UserRole):
    """
    Dependency factory to require specific user role.
    """
    async def role_checker(current_user: UserResponse = Depends(get_current_active_user)) -> UserResponse:
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role {required_role.value} required"
            )
        return current_user

    return role_checker
