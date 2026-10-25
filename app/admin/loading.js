export default function AdminLoading() {
  return (
    <main className="admin-main admin-loading" aria-label="Loading consultation requests" aria-busy="true">
      <div className="admin-heading"><span className="admin-skeleton admin-skeleton-title" /></div>
      <section className="admin-metrics">
        {Array.from({ length: 5 }, (_, index) => <div className="admin-metric" key={index}><span className="admin-skeleton admin-skeleton-label" /><span className="admin-skeleton admin-skeleton-value" /></div>)}
      </section>
      <div className="admin-skeleton admin-skeleton-filters" />
      <div className="admin-skeleton admin-skeleton-table" />
    </main>
  );
}
