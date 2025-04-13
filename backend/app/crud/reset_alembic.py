"""
Script to reset the alembic_version table so we can start fresh with migrations.
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
import sys
import os

# Add the parent directory to sys.path to be able to import app modules
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
sys.path.insert(0, parent_dir)

# Load environment variables
load_dotenv()

# Get database URL from environment variable
database_url = os.getenv("DATABASE_URL")
if database_url and database_url.startswith("postgresql+asyncpg"):
    # Convert to synchronous version for this script
    database_url = database_url.replace("postgresql+asyncpg", "postgresql")

def reset_alembic_version():
    if not database_url:
        print("ERROR: DATABASE_URL environment variable is not set.")
        return False
    
    engine = create_engine(database_url)
    
    try:
        with engine.connect() as connection:
            # Check if alembic_version table exists
            result = connection.execute(text(
                "SELECT EXISTS (SELECT FROM information_schema.tables "
                "WHERE table_name = 'alembic_version')"
            ))
            table_exists = result.scalar()
            
            if table_exists:
                # Drop the alembic_version table
                connection.execute(text("DROP TABLE alembic_version"))
                print("Successfully dropped alembic_version table.")
            else:
                print("alembic_version table does not exist. No need to reset.")
                
            connection.commit()
            return True
    except Exception as e:
        print(f"Error resetting alembic_version table: {e}")
        return False

if __name__ == "__main__":
    print("Resetting Alembic version tracking...")
    success = reset_alembic_version()
    if success:
        print("Successfully reset Alembic version tracking. You can now create a fresh migration.")
    else:
        print("Failed to reset Alembic version tracking.")