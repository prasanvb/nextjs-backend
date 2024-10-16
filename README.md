# NEXTJS-BACKEND

## ENV

- `DATABASE_URL="postgresql://username:password@localhost:5432/databasename?schema=public"`

## NOTES

- You can use local postgres DB from docker-compose
- Entity Relationship diagram under public image
- Next JS Framework image
- `npx prisma studio` to view the data
- `insomnia` folder for APIs
- Most Prisma operations on next js can be performed by server components(GET) ans server actions(POST, UPDATE, DELETE) in next js
- We can use next JS cache to store frequent read operations or use Prisma accelerate to for global caching, connection pooling, etc.

## PRISMA

- Model - Schema
  - `id      Int     @id @default(autoincrement())` - provides incremental id's (e.g, 1,2,3) 
    - NOTE: has a security flaw where users can change the id and get info of other users
  - `id      Int     @id @default(cuid())` - collision resistent unique id's
  - `id      Int     @id @default(uuid())` - universally Unique Identifier
  - `@@index([id, email])` index are improve read performance of the table while performing search operations
- `@prisma/client` can be directly used in next.js server components
- `npx prisma init` - initialize prisma
- Introspection: Run `npx prisma db pull` connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema. NOTE: command will overwrite the current schema.prisma file with the new schema.
- Run `npx prisma db push` pushes the state of your Prisma schema to the database without using migrations. It creates the database if the database does not exist.
- Migration `migrate dev` used in development environments only, requires shadow database(i.e. separate temporary database).
  - `npx prisma migrate dev --name migration-name` - Reruns the existing migration history in the shadow database in order to detect schema drift (i.e. Runs the edited or deleted migration file, or a manual changes to the database schema)
- Run `npx prisma db seed` to add data to DB. Make sure you have `prisma.ts` file with required data and path mentioned in `package.json`
- Relation filters - Filter data based on relation between tables and it values
  - `every`, `some`, `none`, `is`, `isNot`
- Data filters
  - `include` for displying related tables when using relation filters
  - `select` for regular use cases
  - NOTE: We cannot use both `include` and `select` at the sametime
- Aggregate functions
  - `min`, `max`, `avg`, `count`, `some`
- Group By
- Sorting
- Pagination
  - Offset based pagination
    - uses `skip` and `take` to skip a certain number of records and take (i.e. return) a limited range from the point you skipped
    - pros: You can jump to any page immediately and You can paginate the same result set in any sort order and apply filters.
    - cons: Does not scale at a database level. Example, if you want to skip 200,000 records and then database still has to traverse the first 200,000 records before returning the value
  - Cursor based pagination
    - uses `cursor` and `take` to return a limited set of results before or after a given cursor. A cursor bookmarks your location in a result set and must be a unique, sequential column - such as an ID or a timestamp.
    - records can be sorted only based on cursor
    - You can paginate the result set only in cursor sort order and apply filters.
- `create` to create new individual records
- `createOrconnect` (only for the `@relation` records during create action) if the record exists then established the connection or if it doesn't exists then create the record and then established the connection.
- `onDelete: Cascade` option with in the schema model to define the behavior of delete action of the record and its related items
- `createMany` to create multiple records with optional flag to `skipDuplicates: true`. NOTE: `skipDuplicates` does not throw error
- `update` to update an individual records when a condition is meet
- `updateMany` to update multiple records when a condition is meet
- `upsert` - if entity exists then update the entity in the database if not then create the entity  
- `transactions` - all or nothing when performing CURD operations

