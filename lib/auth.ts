export function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 30);
}

export function isValidPassword(password: string) {
  return password.length >= 8;
}
