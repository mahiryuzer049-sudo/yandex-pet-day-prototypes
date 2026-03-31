# Postgres bootstrap

1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env.local` and fill `DATABASE_URL`.
3. Run the SQL from `db/schema.sql`.

The app uses a repository abstraction:
- Postgres when `DATABASE_URL` is available or `REGISTRATION_STORAGE=postgres`
- File fallback when `REGISTRATION_STORAGE=file` or no database is configured
