# Design Notes

### General

- In accordance with 12-Factor principles, I've put any environment-specific config into `.env` files, and provided examples with default values as `.env.example` files any place where you could include a `.env` for configuration.
- The assignment says to "design your approach and write your code as if you were dealing with a database that contained millions of records."  I take this to mean that there could be millions of records within the current set of data types (particularly cities), not that there could be numerous other data types.  
  - That is, if there is the possibility of numerous other data types (ethnicities, counties, states, etc.), I would have made different design decisions that would have allowed for easier extension of data types.
  - Given the data set, I also considered that there would likely be a reasonable upper limit to the amount of continents, and regions that could possibly exist.  As such, I have chosen not to build those queries to handle massive numbers of rows.  Country queries actually are paginated, but I decided against paginating them in the UI (page size set to 999), because there may be a similar upper limit there as well.
  - I've decided to use server-side pagination to handle the possibility of millions of cities, and provided a text search for finding a specific city quickly.  I considered adding more filtering options and sorting, but decided that text search was enough for the scope of this assignment.
  - Modifying the population of a city will not modify the population of its country.  If the dataset had a complete set of all cities within a country, you could fix this by aggregating the sum of all city populations and setting country population to that sum; But that yields incorrect results without a complete set of all cities, so I chose to leave country population static.

### Backend

- I decided to use Django, due to its solid PostgreSQL ORM and the ease of incorportating GraphQL via `django-graphene`.  I felt it was the easiest option to set up quickly, and offers an excellent toolset for managing and query data.
- I considered it to be very important that you could directly use the `world.sql` file provided by pgFoundry without modifications.  This causes some issues with the Django models, and required adding some complexity to handle it.  The instructions for loading the database and migrating the Django models are my determination of the best way to get around these issues given the scope of the assignment.
- Because the main purpose of the Python backend is to serve the GraphQL API, and because most of the data in the database is static and not managed by Django,  I felt it was appropriate to provide a small test suite that only tests the GraphQL API, again given the scope of the assignment.

### Frontend

- I elected to use `create-react-app` for the frontend rather than spinning up my own Babel/Webpack config, as it would let me hit the ground running faster, offers an very convenient dev server, and has a good production build.
- I chose to use `reactstrap`, a React component-based package that implements the Bootstrap 4 design system rather than writing my own CSS.  Again, this helps get the project off the ground faster, and also has mobile considerations built in, reducing the amount of effort required to make a responsive frontend.