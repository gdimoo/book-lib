import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Form = { title: string; author: string; isbn: string; publicationYear: number; quantity: number; cover?: File | null };

export default function BookForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<Form>({ title: '', author: '', isbn: '', publicationYear: 2024, quantity: 1, cover: null });

  useEffect(() => {
    if (isEdit) {
      api.get(`/books/${id}`).then(res => {
        const b = res.data;
        setForm({ title: b.title, author: b.author, isbn: b.isbn, publicationYear: b.publicationYear, quantity: b.quantity, cover: null });
      });
    }
  }, [id]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('author', form.author);
    fd.append('isbn', form.isbn);
    fd.append('publicationYear', String(form.publicationYear));
    fd.append('quantity', String(form.quantity));
    if (form.cover) fd.append('cover', form.cover);

    try {
      if (isEdit) await api.patch(`/books/${id}`, fd);
      else await api.post('/books', fd);
      nav('/');
    } catch (err: any) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message || 'อัปโหลดไม่สำเร็จ';
      if (status !== 413) {
        alert('ไฟล์ใหญ่เกิน 5MB');
      } else {
        alert(Array.isArray(msg) ? msg.join('\n') : String(msg));
      }
    }

    nav('/');
  };

  return (
    <div style={{ maxWidth: 560, margin: '24px auto', fontFamily: 'system-ui' }}>
      <Link to="/">← Back</Link>
      <h2>{isEdit ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
        <label>Title<input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required /></label>
        <label>Author<input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} required /></label>
        <label>ISBN<input value={form.isbn} onChange={e => setForm(f => ({ ...f, isbn: e.target.value }))} required /></label>
        <label>Publication Year<input type="number" value={form.publicationYear} onChange={e => setForm(f => ({ ...f, publicationYear: Number(e.target.value) }))} required /></label>
        <label>Quantity<input type="number" min={0} value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))} required /></label>
        <label>Cover image<input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, cover: e.target.files?.[0] || null }))} /></label>
        <button type="submit">{isEdit ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
}
