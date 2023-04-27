-- Create default database used by the application
SELECT 'CREATE DATABASE db_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_user')\gexec

GRANT ALL PRIVILEGES ON DATABASE db_user TO postgres;

-- Create default database used by the application
SELECT 'CREATE DATABASE db_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_auth')\gexec

GRANT ALL PRIVILEGES ON DATABASE db_auth TO postgres;

-- Create default database used by the application
SELECT 'CREATE DATABASE db_message'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_message')\gexec

GRANT ALL PRIVILEGES ON DATABASE db_message TO postgres;

-- -- Create e2e testing database
-- SELECT 'CREATE DATABASE db-authentication'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gari_e2e_test')\gexec

-- GRANT ALL PRIVILEGES ON DATABASE gari_e2e_test TO postgres;
