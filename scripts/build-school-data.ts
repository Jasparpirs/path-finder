import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { schools } from "../src/data/schools";
import { gymnasiums } from "../src/data/gymnasiums";

type SchoolCategory = "kutsekool" | "ulikool" | "rakenduskorkkool" | "gymnaasium";

type SchoolRow = {
  id: string;
  name: string;
  city: string;
  website: string;
  description: string;
  category: SchoolCategory;
  acceptsAfter9: boolean;
};

type ProgramRow = {
  id: string;
  schoolId: string;
  name: string;
  field: string;
  description: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "data", "out");
const dbDir = path.join(projectRoot, "db");

const csvOnly = process.argv.includes("--csv-only");
const sqlOnly = process.argv.includes("--sql-only");

function mapCategory(type: "university" | "applied" | "vocational"): SchoolCategory {
  if (type === "university") return "ulikool";
  if (type === "applied") return "rakenduskorkkool";
  return "kutsekool";
}

function escapeCsv(value: string | boolean | number): string {
  const raw = String(value ?? "");
  if (raw.includes('"') || raw.includes(",") || raw.includes("\n")) {
    return `"${raw.replaceAll('"', '""')}"`;
  }
  return raw;
}

function toCsv<T extends Record<string, string | boolean | number>>(rows: T[], columns: (keyof T)[]): string {
  const header = columns.join(",");
  const body = rows
    .map((row) => columns.map((col) => escapeCsv(row[col])).join(","))
    .join("\n");
  return `${header}\n${body}\n`;
}

function escapeSql(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

function toSqlBoolean(value: boolean): "0" | "1" {
  return value ? "1" : "0";
}

function buildRows() {
  const schoolRows: SchoolRow[] = schools.map((school) => ({
    id: school.id,
    name: school.name,
    city: school.city,
    website: school.website,
    description: school.description,
    category: mapCategory(school.type),
    acceptsAfter9: school.acceptsAfter9,
  }));

  const gymnasiumRows: SchoolRow[] = gymnasiums.map((school) => ({
    id: school.id,
    name: school.name,
    city: school.city,
    website: school.website,
    description: school.description,
    category: "gymnaasium",
    acceptsAfter9: true,
  }));

  const programRows: ProgramRow[] = schools.flatMap((school) =>
    school.professions.map((program) => ({
      id: program.id,
      schoolId: school.id,
      name: program.name,
      field: program.field,
      description: program.description,
    })),
  );

  return {
    schoolRows,
    gymnasiumRows,
    allSchoolRows: [...schoolRows, ...gymnasiumRows],
    programRows,
  };
}

function buildFullMysqlImportSql(schoolRows: SchoolRow[], programRows: ProgramRow[]): string {
  const schoolInserts = schoolRows
    .map(
      (row) =>
        `('${escapeSql(row.id)}','${escapeSql(row.name)}','${escapeSql(row.city)}','${row.category}','${escapeSql(row.website)}','${escapeSql(row.description)}',${toSqlBoolean(row.acceptsAfter9)})`,
    )
    .join(",\n");

  const programInserts = programRows
    .map(
      (row) =>
        `('${escapeSql(row.id)}','${escapeSql(row.schoolId)}','${escapeSql(row.name)}','${escapeSql(row.field)}','${escapeSql(row.description)}')`,
    )
    .join(",\n");

  return `SET NAMES utf8mb4;
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

INSERT INTO schools
  (id, name, city, category, website, description, accepts_after9)
VALUES
${schoolInserts};

INSERT INTO programs
  (id, school_id, name, field, description)
VALUES
${programInserts};

SET FOREIGN_KEY_CHECKS = 1;
`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(dbDir, { recursive: true });

  const { schoolRows, gymnasiumRows, allSchoolRows, programRows } = buildRows();

  if (!sqlOnly) {
    const kutsekoolid = schoolRows.filter((row) => row.category === "kutsekool");
    const ulikoolid = schoolRows.filter((row) => row.category === "ulikool" || row.category === "rakenduskorkkool");

    await writeFile(path.join(outDir, "kutsekoolid.csv"), toCsv(kutsekoolid, ["id", "name", "city", "category", "website", "description", "acceptsAfter9"]), "utf8");
    await writeFile(path.join(outDir, "ulikoolid.csv"), toCsv(ulikoolid, ["id", "name", "city", "category", "website", "description", "acceptsAfter9"]), "utf8");
    await writeFile(path.join(outDir, "gymnaasiumid.csv"), toCsv(gymnasiumRows, ["id", "name", "city", "category", "website", "description", "acceptsAfter9"]), "utf8");
    await writeFile(path.join(outDir, "schools_all.csv"), toCsv(allSchoolRows, ["id", "name", "city", "category", "website", "description", "acceptsAfter9"]), "utf8");
    await writeFile(path.join(outDir, "programs.csv"), toCsv(programRows, ["id", "schoolId", "name", "field", "description"]), "utf8");
  }

  if (!csvOnly) {
    const fullSql = buildFullMysqlImportSql(allSchoolRows, programRows);
    await writeFile(path.join(outDir, "opieesti_mysql_import.sql"), fullSql, "utf8");
    await writeFile(path.join(dbDir, "opieesti_mysql.sql"), fullSql, "utf8");
  }

  const summary = {
    schools: allSchoolRows.length,
    programs: programRows.length,
    vocational: schoolRows.filter((row) => row.category === "kutsekool").length,
    universities: schoolRows.filter((row) => row.category === "ulikool").length,
    applied: schoolRows.filter((row) => row.category === "rakenduskorkkool").length,
    gymnasiums: gymnasiumRows.length,
  };

  await writeFile(path.join(outDir, "build_summary.json"), JSON.stringify(summary, null, 2), "utf8");
  console.log("Data build complete:", summary);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
