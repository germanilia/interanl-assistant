import sys
from sqlalchemy.exc import SQLAlchemyError

from app.db import engine
from app.models import Base
from app.db.create_database import create_database
from app.db.run_migrations import run_migrations
from app.core.logging_service import get_logger

# Get logger for this module
logger = get_logger(__name__)


def init_db():
    """
    Initialize the database by:
    1. Creating the database if it doesn't exist
    2. Running migrations to ensure schema is up to date
    3. Falling back to create_all() if migrations fail
    """
    try:
        # Step 1: Create database if it doesn't exist
        logger.info("Creating database if it doesn't exist", operation="create_database")
        db_created = create_database()
        if not db_created:
            logger.error("Failed to create database", operation="create_database", status="error")
            return False

        # Step 2: Run migrations to ensure schema is up to date
        logger.info("Running database migrations", operation="run_migrations")
        migrations_success = run_migrations()

        if migrations_success:
            logger.info("Database migrations completed successfully", operation="run_migrations", status="success")
            return True
        else:
            logger.warning("Migrations failed, falling back to create_all()", operation="run_migrations", status="warning")

            # Step 3: Fallback to create_all() if migrations fail
            logger.info("Creating database tables using SQLAlchemy create_all()", operation="create_tables_fallback")
            Base.metadata.create_all(bind=engine)
            logger.info("Database tables created successfully using fallback method", operation="create_tables_fallback", status="success")
            return True

    except SQLAlchemyError as e:
        logger.error(
            "Error during database initialization",
            operation="init_db",
            status="error",
            error=str(e)
        )
        return False
    except Exception as e:
        logger.error(
            "Unexpected error during database initialization",
            operation="init_db",
            status="error",
            error=str(e)
        )
        return False


if __name__ == "__main__":
    # This allows the script to be run directly

    # First, create the database if it doesn't exist
    logger.info("Ensuring database exists...")
    if not create_database():
        logger.error("Failed to create database")
        sys.exit(1)

    # Then initialize the database schema
    success = init_db()
    sys.exit(0 if success else 1)
