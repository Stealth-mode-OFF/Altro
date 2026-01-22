const rawAdminEmails = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined) || '';

export const ADMIN_EMAILS = rawAdminEmails
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;
  if (ADMIN_EMAILS.length === 0) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
