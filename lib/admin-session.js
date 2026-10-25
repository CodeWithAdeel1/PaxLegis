import { cookies } from 'next/headers';
import { ADMIN_COOKIE, readAdminSession } from './admin-auth';

export async function getAdminSession() {
  const cookieStore = await cookies();
  return readAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function validRequestId(value) {
  return typeof value === 'string' && /^[1-9]\d{0,9}$/.test(value);
}
