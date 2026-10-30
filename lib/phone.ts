// Shared by the form (browser) and the server, so both agree on what a valid number is.

// Turns whatever the person typed into a plain 10-digit Indian mobile number.
// Accepts: 9829309790, +91 98293 09790, 91 9829309790, 09829309790, 0091 9829309790
export function cleanPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("0091")) digits = digits.slice(4);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

// Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9.
export function isValidPhone(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits);
}