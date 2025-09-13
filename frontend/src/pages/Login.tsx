import { FormEvent, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../state/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setToken } = useAuth();
  const nav = useNavigate();
  const [username, setU] = useState('admin');
  const [password, setP] = useState('admin');
  const [err, setErr] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await api.post('/auth/login', { username, password });
    if (res.data?.token) {
      setToken(res.data.token);
      nav('/');
    } else {
      setErr('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '64px auto', fontFamily: 'system-ui' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input value={username} onChange={e=>setU(e.target.value)} style={{width:'100%'}}/>
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setP(e.target.value)} style={{width:'100%'}}/>
        <button type="submit" style={{ marginTop: 12 }}>Sign in</button>
      </form>
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
    </div>
  );
}
