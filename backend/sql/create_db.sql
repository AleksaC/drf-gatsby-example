CREATE DATABASE gis;
CREATE USER aleksa WITH PASSWORD 'projekat';
ALTER ROLE aleksa SET client_encoding TO 'utf8';
ALTER ROLE aleksa SET default_transaction_isolation TO 'read committed';
ALTER ROLE aleksa SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE gis TO aleksa;
\c gis;
CREATE EXTENSION postgis;