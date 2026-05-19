import { schools, type School } from "@/data/schools";
import { gymnasiums, type Gymnasium } from "@/data/gymnasiums";

export function getSchools(): School[] {
  return schools;
}

export function getGymnasiums(): Gymnasium[] {
  return gymnasiums;
}

export function getSchoolById(schoolId: string): School | undefined {
  return schools.find((school) => school.id === schoolId);
}
