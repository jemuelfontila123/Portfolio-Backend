# Portfolio snapshot setup
Copy these files over your existing repository, preserving all other files and .env. No new dependencies.
Set MONGODB_DB_NAME=Portfolio_Dev in root .env for isolated testing (optional; default Portfolio). This also applies to create-admin and server.
Run from root: npm run seed:portfolio, npm run export:data, npm run dev. If using a fresh database, run npm run create-admin too.
Seed matches exact titles and fills missing fields; renamed records may be inserted again if you rerun seed. Existing unrelated records remain and will be exported. Do not run seed automatically at startup.
Admin changes appear in public data after npm run export:data locally; production needs a new build/deployment. Root npm run build exports then builds; client-only build uses committed snapshots and needs no database credentials. Commit generated JSON for static deployment.
Image values can be existing asset filenames (covid.png, exam.png, ircc.png) or HTTP(S) URLs. New local images must be added to client/src/assets. No upload feature is included.
