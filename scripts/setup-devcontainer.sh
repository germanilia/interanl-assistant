#!/bin/bash

# DevContainer Post-Create Setup Script
# This script sets up the development environment after the container is created

set -e  # Exit on any error

echo "🚀 Starting DevContainer setup..."

# Add host.docker.internal to /etc/hosts for proper networking
echo "📝 Configuring host networking..."
echo 'host.docker.internal host-gateway' >> /etc/hosts

# Verify Docker installation
echo "🐳 Verifying Docker installation..."
docker --version

# Update package lists
echo "📦 Updating package lists..."
sudo apt-get update

# Install Just (command runner)
echo "⚡ Installing Just command runner..."
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/local/bin

# Install system dependencies
echo "🔧 Installing system dependencies..."
sudo apt-get install -y libpq-dev python3-dev gcc iputils-ping expect

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install fastapi uvicorn sqlalchemy alembic psycopg2-binary pydantic pydantic-settings

# Install backend requirements if they exist
if [ -f 'backend/requirements.txt' ]; then
    echo "📋 Installing backend requirements..."
    pip install -r backend/requirements.txt
else
    echo "⚠️  No backend/requirements.txt found, skipping..."
fi

# Install frontend dependencies if client directory exists
if [ -d 'client' ]; then
    echo "🎨 Installing frontend dependencies..."
    cd client
    #npm install
    
    # Install Playwright with automated responses using inline expect
    echo "🎭 Installing Playwright..."
    
    # Use expect directly in the bash script with a here-document
    expect << EOF
spawn npm init -y playwright@latest
expect "Do you want to use TypeScript or JavaScript?"
send "\r"
expect "Where to put your end-to-end tests?"
send "tests\r"
expect "Add a GitHub Actions workflow?"
send "n\r"
expect "Install Playwright browsers"
send "y\r"
expect "Install Playwright operating system dependencies"
send "y\r"
expect eof
EOF
    npx playwright install-deps 
    npx playwright install chromium
    cd ..
else
    echo "⚠️  No client directory found, skipping npm install and Playwright setup..."
fi

# Configure Git
echo "🔧 Configuring Git..."
git config --global user.email 'iliagerman@gmail.com'
git config --global user.name 'Ilia German'

# Install LocalStack CLI
echo "☁️  Installing LocalStack CLI..."
curl --output localstack-cli-4.4.0-linux-arm64-onefile.tar.gz \
     --location https://github.com/localstack/localstack-cli/releases/download/v4.4.0/localstack-cli-4.4.0-linux-arm64-onefile.tar.gz
sudo tar xvzf localstack-cli-4.4.0-linux-arm64-onefile.tar.gz -C /usr/local/bin
rm localstack-cli-4.4.0-linux-arm64-onefile.tar.gz

# Install AWS CLI Local
echo "🌐 Installing AWS CLI Local..."
pip install awscli-local

# Verify installations
echo "✅ Verifying installations..."
localstack --version
awslocal --version

echo "🎉 DevContainer setup completed successfully!"
