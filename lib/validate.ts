// Shared by the form (browser) and the server, so both apply exactly the same rules.

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

// Tidies what was typed: trims the ends and turns runs of spaces into one space.
export function tidy(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

// A person's name: letters (any language, so Hindi names work too), spaces,
// dots, apostrophes and hyphens. No digits, no @, no other symbols.
// Must contain at least 2 letters.  e.g. "Ramesh Kumar", "D. K. Sharma", "O'Brien"
// (Built with new RegExp so TypeScript's ES2017 target accepts the Unicode "u" flag.)
const NAME_RE = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} .'-]*$", "u");
const LETTER_RE = new RegExp("\\p{L}", "gu");

export function nameProblem(value: string, label: string): string | null {
  const v = tidy(value);
  if (v.length === 0) return `Please enter the ${label}.`;
  if (/\d/.test(v)) return `The ${label} cannot contain numbers.`;
  if (!NAME_RE.test(v)) return `The ${label} can only contain letters, spaces, dots and hyphens.`;
  if ((v.match(LETTER_RE) ?? []).length < 2) return `Please enter the full ${label}.`;
  if (v.length > 100) return `The ${label} is too long.`;
  return null;
}

// A city or town: letters, spaces, dots, hyphens, apostrophes and brackets.
// No digits.  e.g. "Bikaner", "Sri Ganganagar", "Navi Mumbai (Vashi)"
const CITY_RE = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} .'()-]*$", "u");

export function cityProblem(value: string): string | null {
  const v = tidy(value);
  if (v.length < 2) return "Please enter your city.";
  if (/\d/.test(v)) return "The city cannot contain numbers.";
  if (!CITY_RE.test(v)) return "Please enter a valid city name.";
  if (v.length > 100) return "The city name is too long.";
  return null;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) && value.trim().length <= 200;
}

export function isBloodGroup(value: string): boolean {
  return (BLOOD_GROUPS as readonly string[]).includes(value);
}