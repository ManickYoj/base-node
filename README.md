# node-base
A basic node setup for springboarding projects.

## Setup (Ubuntu)

1. Install node modules
```
npm install

# To be able to use knex migrations
npm install knex -g
```

2. Set up postgres
```
# -- Install postgres locally
sudo apt-get install postgres postgres-contrib

# -- Set postgres default user password
sudo passwd postgres

# -- Set up postgres to boot automatically when Ubuntu does
sudo update-rc.d postgresql enable

# -- Create a database for the project
# Change user to postgres for ident login
sudo su - postgres
# Start postgres prompt
psql
# In PSQL prompt
# Set admin account password (for general security)
\password postgres

# Create project database and authorized user
CREATE_DATABASE development
CREATE USER developer
GRANT ALL PRIVILEGES ON DATABASE development TO developer
/password developer
```

3. Create and configure a .env file
```
touch .env
```

In the .env file:
```
PSQL_DEV_HOST=localhost
PSQL_DEV_USER=developer
PSQL_DEV_PW=<psql developer password>
SESSION_SECRET=<random secret key, eg. via python's os.urandom(20)>
```

4. Migrate schema to include users table
```
knex migrate:latest --env development
```

## Usage
Start server:
```
node index.js
```

Run tests:
```
npm test
```

## Major components/packages
express - web server
pg/knex - Database driver and query builder
passport/passport-local - User authentication and local-auth strategy
bcryptjs - password salting and hashing
express-session - Session management
body-parser - Parsing?
dotenv - A utility for loading the .env file into process.env
mocha/chai/chai-http - Test framework, assertions, and server