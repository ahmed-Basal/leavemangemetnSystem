import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="portal-main" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div className="table-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, color: '#6366f1' }}>404</h1>
        <h2 style={{ marginTop: '0.5rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
