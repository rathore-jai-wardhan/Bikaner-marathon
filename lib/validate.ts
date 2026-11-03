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
// Common misspellings of email providers, e.g. "gamil.com". Mail to these bounces,
// so the runner would never get their confirmation.
const DOMAIN_TYPOS: Record<string, string> = {
  "gamil.com": "gmail.com", "gmial.com": "gmail.com", "gmai.com": "gmail.com",
  "gmal.com": "gmail.com", "gmil.com": "gmail.com", "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com", "gmailm.com": "gmail.com", "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com", "gmail.con": "gmail.com", "gmail.om": "gmail.com",
  "gmail.in": "gmail.com", "gmali.com": "gmail.com", "gamail.com": "gmail.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com", "hotmial.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com", "outlook.co": "outlook.com", "rediffmail.co": "rediffmail.com",
  "icloud.co": "icloud.com",
};

// Returns an error message if the email is invalid or has a misspelt provider, else null.
export function emailProblem(value: string, whose: string): string | null {
  const v = value.trim().toLowerCase();
  if (!isValidEmail(v)) return `Please enter a valid email address${whose}.`;
  const domain = v.split("@")[1];
  const fix = DOMAIN_TYPOS[domain];
  if (fix) return `Please check the email address${whose}: did you mean ${v.split("@")[0]}@${fix}?`;
  return null;
}

// The youngest age accepted on race day. Catches a date of birth entered as
// today's date or the race date by mistake.
export const MIN_AGE = 3;