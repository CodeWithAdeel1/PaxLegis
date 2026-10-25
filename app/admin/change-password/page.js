import AdminNav from '../../../components/AdminNav';
import AdminPasswordForm from '../../../components/AdminPasswordForm';
import { getAdminSession } from '../../../lib/admin-session';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Change password' };
export const dynamic = 'force-dynamic';

export default async function ChangePasswordPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <>
      <AdminNav username={session.username} />
      <main className="admin-main">
        <div className="admin-heading"><div><p className="admin-eyebrow">Account settings</p><h1>Change password</h1></div></div>
        <AdminPasswordForm />
      </main>
    </>
  );
}
