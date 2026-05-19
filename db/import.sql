SET NAMES utf8mb4;
USE opieesti;

TRUNCATE TABLE programs;
TRUNCATE TABLE schools;

-- CLI helper script. Use with mysql client:
-- mysql -u root -p opieesti < db/import.sql
--
-- This file references generated SQL from data/out/.
SOURCE data/out/opieesti_mysql_import.sql;
