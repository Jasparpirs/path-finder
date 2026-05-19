SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS opieesti
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE opieesti;

DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
  id VARCHAR(128) NOT NULL,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  category ENUM('kutsekool','ulikool','rakenduskorkkool','gymnaasium') NOT NULL,
  website VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  accepts_after9 TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_schools_category (category),
  KEY idx_schools_city (city),
  KEY idx_schools_after9 (accepts_after9)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE programs (
  id VARCHAR(128) NOT NULL,
  school_id VARCHAR(128) NOT NULL,
  name VARCHAR(255) NOT NULL,
  field VARCHAR(64) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_programs_school_id (school_id),
  KEY idx_programs_field (field),
  CONSTRAINT fk_programs_school FOREIGN KEY (school_id)
    REFERENCES schools (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
