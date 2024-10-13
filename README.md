# NEXTJS-BACKEND

## ENV

- `DATABASE_URL="postgresql://username:password@localhost:5432/databasename?schema=public"`

## NOTE

- Entity Relationship diagram under public images

## PRISMA

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
- `create` to create individual records
- `createOrconnect` to connect record if it exists or creata new record if it doesn't exists.

## SAMPLE PAYLOAD

- create user with posts
```
{
	"name": "Prasan",
	"email": "prasan+9@gmail.com",
	"role": "USER",
	"posts":[
		{
			"title": "Learn about Prisma on Udemy",
			"published" : false,
			"likeNum": 77,
			"catgories" : [
				{
					"id": 3
				}
			]
		}
	]
}
```
