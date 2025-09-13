import { useEffect, useState } from 'react';
import { api } from '../api';
import { Link, useParams } from 'react-router-dom';

type Book = { id:number; title:string; author:string; isbn:string; publicationYear:number; quantity:number; coverPath?:string };

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  const fetchOne = async () => {
    const res = await api.get(`/books/${id}`);
    setBook(res.data);
  };

  useEffect(() => { fetchOne(); }, [id]);

  const borrow = async () => { await api.post(`/books/${id}/borrow`); await fetchOne(); };
  const ret = async () => { await api.post(`/books/${id}/return`); await fetchOne(); };

  if (!book) return <div style={{ padding:24 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 720, margin:'24px auto', fontFamily:'system-ui' }}>
      <Link to="/">← Back</Link>
      <h2>{book.title}</h2>
      {book.coverPath && <img src={book.coverPath} style={{ width:'100%', maxHeight:360, objectFit:'cover', borderRadius:8 }} />}
      <p><b>Author:</b> {book.author}</p>
      <p><b>ISBN:</b> {book.isbn}</p>
      <p><b>Year:</b> {book.publicationYear}</p>
      <p><b>Quantity:</b> {book.quantity}</p>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={borrow} disabled={book.quantity<=0}>Borrow</button>
        <button onClick={ret}>Return</button>
        <Link to={`/books/${book.id}/edit`}><button>Edit</button></Link>
      </div>
    </div>
  );
}
