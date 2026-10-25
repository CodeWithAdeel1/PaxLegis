export default function AdminRequestLoading() {
  return (
    <main className="admin-main admin-loading" aria-label="Loading request details" aria-busy="true">
      <div className="admin-heading"><span className="admin-skeleton admin-skeleton-title" /><span className="admin-skeleton admin-skeleton-actions" /></div>
      <div className="admin-detail-layout">
        <section className="admin-detail-card">
          <span className="admin-skeleton admin-skeleton-label" />
          <div className="admin-skeleton admin-skeleton-details" />
        </section>
        <aside className="admin-action-card"><span className="admin-skeleton admin-skeleton-details" /></aside>
      </div>
    </main>
  );
}
