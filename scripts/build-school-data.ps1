$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$schoolsPath = Join-Path $projectRoot "src/data/schools.ts"
$gymnasiumsPath = Join-Path $projectRoot "src/data/gymnasiums.ts"
$outDir = Join-Path $projectRoot "data/out"
$dbDir = Join-Path $projectRoot "db"

New-Item -ItemType Directory -Path $outDir -Force | Out-Null
New-Item -ItemType Directory -Path $dbDir -Force | Out-Null

function Escape-Csv([object]$value) {
  $text = [string]$value
  if ($text.Contains('"') -or $text.Contains(',') -or $text.Contains("`n")) {
    return '"' + $text.Replace('"', '""') + '"'
  }
  return $text
}

function Write-CsvFile($path, $rows, $columns) {
  $lines = @()
  $lines += ($columns -join ',')

  foreach ($row in $rows) {
    $values = foreach ($column in $columns) { Escape-Csv $row[$column] }
    $lines += ($values -join ',')
  }

  [System.IO.File]::WriteAllText($path, ($lines -join "`n") + "`n", [System.Text.Encoding]::UTF8)
}

function Escape-Sql([string]$value) {
  return $value.Replace('\\', '\\\\').Replace("'", "\\'")
}

function Map-Category([string]$type) {
  switch ($type) {
    "university" { return "ulikool" }
    "applied" { return "rakenduskorkkool" }
    default { return "kutsekool" }
  }
}

$schoolsContent = Get-Content -Path $schoolsPath -Raw -Encoding UTF8
$schoolMatches = [regex]::Matches(
  $schoolsContent,
  '(?s)\{\s*id:\s*"(?<id>[^"]+)"\s*,\s*name:\s*"(?<name>[^"]+)"\s*,\s*city:\s*"(?<city>[^"]+)"\s*,\s*type:\s*"(?<type>[^"]+)"\s*,\s*acceptsAfter9:\s*(?<after9>true|false)\s*,\s*website:\s*"(?<website>[^"]+)"\s*,\s*description:\s*"(?<description>[^"]+)"\s*,\s*professions:\s*\[(?<professions>.*?)\]\s*,\s*\}'
)

$schools = @()
$programs = @()

foreach ($match in $schoolMatches) {
  $school = [ordered]@{
    id = $match.Groups['id'].Value
    name = $match.Groups['name'].Value
    city = $match.Groups['city'].Value
    category = Map-Category $match.Groups['type'].Value
    website = $match.Groups['website'].Value
    description = $match.Groups['description'].Value
    acceptsAfter9 = ($match.Groups['after9'].Value -eq 'true')
  }
  $schools += $school

  $professionText = $match.Groups['professions'].Value
  $professionMatches = [regex]::Matches(
    $professionText,
    '\{\s*id:\s*"(?<id>[^"]+)"\s*,\s*name:\s*"(?<name>[^"]+)"\s*,\s*field:\s*"(?<field>[^"]+)"\s*,\s*description:\s*"(?<description>[^"]+)"\s*\}'
  )

  foreach ($profession in $professionMatches) {
    $programs += [ordered]@{
      id = $profession.Groups['id'].Value
      schoolId = $school.id
      name = $profession.Groups['name'].Value
      field = $profession.Groups['field'].Value
      description = $profession.Groups['description'].Value
    }
  }
}

$gymContent = Get-Content -Path $gymnasiumsPath -Raw -Encoding UTF8
$gymMatches = [regex]::Matches(
  $gymContent,
  '\{\s*id:\s*"(?<id>[^"]+)"\s*,\s*name:\s*"(?<name>[^"]+)"\s*,\s*city:\s*"(?<city>[^"]+)"\s*,\s*website:\s*"(?<website>[^"]+)"\s*,\s*description:\s*"(?<description>[^"]+)"\s*\}'
)

$gymnasiums = @()
foreach ($gym in $gymMatches) {
  $gymnasiums += [ordered]@{
    id = $gym.Groups['id'].Value
    name = $gym.Groups['name'].Value
    city = $gym.Groups['city'].Value
    category = 'gymnaasium'
    website = $gym.Groups['website'].Value
    description = $gym.Groups['description'].Value
    acceptsAfter9 = $true
  }
}

$allSchools = @($schools + $gymnasiums)
$kutsekoolid = @($schools | Where-Object { $_.category -eq 'kutsekool' })
$ulikoolid = @($schools | Where-Object { $_.category -in @('ulikool', 'rakenduskorkkool') })

Write-CsvFile (Join-Path $outDir 'kutsekoolid.csv') $kutsekoolid @('id', 'name', 'city', 'category', 'website', 'description', 'acceptsAfter9')
Write-CsvFile (Join-Path $outDir 'ulikoolid.csv') $ulikoolid @('id', 'name', 'city', 'category', 'website', 'description', 'acceptsAfter9')
Write-CsvFile (Join-Path $outDir 'gymnaasiumid.csv') $gymnasiums @('id', 'name', 'city', 'category', 'website', 'description', 'acceptsAfter9')
Write-CsvFile (Join-Path $outDir 'schools_all.csv') $allSchools @('id', 'name', 'city', 'category', 'website', 'description', 'acceptsAfter9')
Write-CsvFile (Join-Path $outDir 'programs.csv') $programs @('id', 'schoolId', 'name', 'field', 'description')

$schoolSqlRows = foreach ($row in $allSchools) {
  $after9 = if ($row.acceptsAfter9) { 1 } else { 0 }
  "('$(Escape-Sql $row.id)','$(Escape-Sql $row.name)','$(Escape-Sql $row.city)','$(Escape-Sql $row.category)','$(Escape-Sql $row.website)','$(Escape-Sql $row.description)',$after9)"
}

$programSqlRows = foreach ($row in $programs) {
  "('$(Escape-Sql $row.id)','$(Escape-Sql $row.schoolId)','$(Escape-Sql $row.name)','$(Escape-Sql $row.field)','$(Escape-Sql $row.description)')"
}

$sql = @"
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

INSERT INTO schools
  (id, name, city, category, website, description, accepts_after9)
VALUES
$($schoolSqlRows -join ",`n");

INSERT INTO programs
  (id, school_id, name, field, description)
VALUES
$($programSqlRows -join ",`n");

SET FOREIGN_KEY_CHECKS = 1;
"@

[System.IO.File]::WriteAllText((Join-Path $outDir 'opieesti_mysql_import.sql'), $sql, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $dbDir 'opieesti_mysql.sql'), $sql, [System.Text.Encoding]::UTF8)

$summary = [ordered]@{
  schools = $allSchools.Count
  programs = $programs.Count
  vocational = ($schools | Where-Object { $_.category -eq 'kutsekool' }).Count
  universities = ($schools | Where-Object { $_.category -eq 'ulikool' }).Count
  applied = ($schools | Where-Object { $_.category -eq 'rakenduskorkkool' }).Count
  gymnasiums = $gymnasiums.Count
}

$summaryJson = $summary | ConvertTo-Json
[System.IO.File]::WriteAllText((Join-Path $outDir 'build_summary.json'), $summaryJson, [System.Text.Encoding]::UTF8)

Write-Host "Data build complete"
Write-Host ($summary | ConvertTo-Json -Compress)
