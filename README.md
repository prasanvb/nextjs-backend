# NEXTJS-BACKEND

## PRISMA

- Introspection: Run `prisma db pull` connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema. NOTE: command will overwrite the current schema.prisma file with the new schema.
- Run `prisma db push` pushes the state of your Prisma schema to the database without using migrations. It creates the database if the database does not exist.
- Migration `migrate dev` For use in development environments only, requires shadow database
  - `prisma migrate dev --name add-posts-category` - Reruns the existing migration history in the shadow database in order to detect schema drift (edited or deleted migration file, or a manual changes to the database schema)