import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin({ onLogin, onBackToStore }) {
  const [email, setEmail] = useState('admin@atelier.id');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(email, password);
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div className="admin-login-card">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ marginBottom: '20px' }}
          onClick={onBackToStore}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Toko</span>
        </button>

        <div className="admin-login-head">
          <div className="admin-login-icon">
            <Lock size={26} />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Portal Admin Atelier</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Wajib login dengan kredensial pengelola untuk mengakses pesanan & stok.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: 'var(--accent-rose)',
              fontSize: '0.85rem',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShieldAlert size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Admin</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <KeyRound size={18} />
            <span>Masuk ke Dashboard</span>
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div
          style={{
            marginTop: '24px',
            padding: '14px',
            borderRadius: '8px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
            DEMO ADMIN CREDENTIALS:
          </div>
          <div>Email: <strong>admin@atelier.id</strong></div>
          <div>Password: <strong>admin123</strong></div>
        </div>
      </div>
    </div>
  );
}
