# world-codetest
A simple app to look up countries and cities, and edit city data, using the [world dataset](https://ftp.postgresql.org/pub/projects/pgFoundry/dbsamples/world/world-1.0/world-1.0.tar.gz) from [pgFoundry Sample Databases](https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/) project.

## Installation

This app consists of a Python Django backend that serves a GraphQL API and a React.js frontend that consumes that API.  Both aspects must be set up in order to run properly.  The Django backend requires a PostgreSQL database for correct operation, which should have the world dataset  loaded and may be installed locally or on a remote server.

###Requirements

- PostgreSQL > 9.4
- Python 3.6 or higher
- Yarn package manager and Node.js to run it

###Database Setup

Before starting the app installation, you will need a PostgreSQL database loaded with the world dataset.  Django will need to create tables in that database, so make sure you are using a database you are free to modify.  You will also need a database user for Django to use, which will also need read/write access.

If you do not have a database set up, you will need to create one and load the world dataset into it.  You can get the dataset from the link mentioned earlier in this README, or use the copy provided within the project directory at `data/world.sql`.  If you are on a Unix-based machine, you can load the data with `psql -d <database_name> -a -f data/world.sql`

> **IMPORTANT:** Django migrations will fail if the tables loaded from the world data are not owned by the user Django will use to access the database!  You should either load the data as the Django user, or ensure that the tables are owned by the Django user before continuing.

### Backend Setup

Begin by setting up a virtualenv for Python and activating it:

```bash
python3 -m venv <path_to_venv>
source <path_to_venv>/bin/activate
```

Install dependencies with Pip:

```bash
pip install -r requirements.txt
```

Set up your database configuration by creating a `.env` file in the `server` directory.  Use `.env.example` in the same directory for reference.  Replace the defaults with the values for your PostgreSQL DB.  If you are on a Unix-based machine:

```bash
cd <project_root>
cat .env.example > .env
vi .env #Edit defaults to match your DB
```

The last step is performing the Django migrations:

```bash
cd <project_root>
python manage.py migrate --fake-initial world
...
python manady.py migrate
...
```

> **NOTE:** The `--fake-initial` flag is required for the first set of migrations because the data is already loaded in the database.  Migrating without faking the initial migration will cause Django to throw errors due to the fact that tables aready exist.

### Frontend Setup

Start by installing the Node dependencies for the frontend:

```bash
cd <project_root>/ui
yarn install
...
```

Set up the frontend to use the correct URL for the backend API.  This is also done with a `.env` file, this time in the `ui` folder.  There is a `.env.example` file that contains the defaults to use for reference.  You should set the URL to:

```
http://<app_host>:<app_port>/graphql
```

Once you have your API URL set, you need to build the frontend:

```
yarn build
...
```

### Running the App

To run the development version of the app, simply:

```bash
cd <project_root>
python manage.py runserver
```

If you want to run on a port other than 8000:

```bash
python manage.py runserver 6789
```

If you want to run on a host other than localhost:

```bash
python manage.py runserver 0.0.0.0:8000
```

> **NOTE:** Make sure the host/port combination you use matches the API URL you used for the frontend, otherwise the frontend will not connect and you will get "Failed to fetch" errors.



If all went well, the app should now be running at `http://<host>:<port>`.  Navigating there with a browser should give you the frontend application.  The GraphQL server and schema is available via GraphiQL at `http://<host>:<port>/graphql`.