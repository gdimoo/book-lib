import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../state/auth';
import { setAuthToken } from '../api';

type Book = { id: number; title: string; author: string; isbn: string; publicationYear: number; quantity: number; coverPath?: string };

export default function Books() {
  const nav = useNavigate();
  const { setToken } = useAuth();
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Book[]>([]);
  const fetchList = async () => {
    const res = await api.get('/books', { params: { q } });
    setItems(res.data);
  };
  const logout = () => {
    setToken(null);
    setAuthToken(null);
    nav('/login', { replace: true });
  };

  useEffect(() => { fetchList(); }, []);
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', fontFamily: 'system-ui' }}>
      <button onClick={logout}>Logout</button>
      <h2>Books</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title/author/isbn" style={{ flex: 1 }} />
        <button onClick={fetchList}>Search</button>
        <button onClick={() => nav('/books/new')}>Add</button>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 12, listStyle: 'none', padding: 0 }}>
        {items.map(b => (
          <li key={b.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            {b.coverPath && <img src={b.coverPath} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6 }} />}
            <h3 style={{ margin: '8px 0 4px' }}>{b.title}</h3>
            <div>{b.author} • {b.publicationYear}</div>
            <div>ISBN: {b.isbn}</div>
            <div>Qty: {b.quantity}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Link to={`/books/${b.id}`}>Detail</Link>
              <Link to={`/books/${b.id}/edit`}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
