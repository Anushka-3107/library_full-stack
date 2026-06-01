import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = 'http://localhost:7000';

export default function Books() {
  const [books,   setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [title,   setTitle]   = useState('');
  const [author,  setAuthor]  = useState('');

  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    try {
      setLoading(true); setError('');
      const { data } = await axios.get(`${BASE}/books`);
      setBooks(data.data);
    } catch {
      setError('Could not load books. Is your backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    try {
      await axios.post(`${BASE}/books`, { title, author });
      setTitle(''); setAuthor('');
      fetchBooks();
    } catch { setError('Failed to add book.'); }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this book?')) return;
    try {
      await axios.delete(`${BASE}/books/${id}`);
      fetchBooks();
    } catch { setError('Failed to delete book.'); }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-white">Books</h1>
        <div className="w-12 h-0.5 bg-amber-400 mt-2 mb-1" />
        {!loading && <p className="text-zinc-500 text-xs">{books.length} titles in collection</p>}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-950 border border-red-900 text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8 flex-wrap">
        <input
          placeholder="Book title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 min-w-36 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
        <input
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="flex-1 min-w-36 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-amber-400 text-zinc-900 text-sm font-semibold rounded-lg hover:bg-amber-300 active:scale-95 transition-all"
        >
          + Add Book
        </button>
      </form>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 text-sm">No books yet — add one above.</div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-zinc-500 font-medium">#</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-zinc-500 font-medium">Title</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-zinc-500 font-medium">Author</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-zinc-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={book.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 text-zinc-600 text-xs">{i + 1}</td>
                  <td className="px-5 py-4 text-white text-sm">{book.title}</td>
                  <td className="px-5 py-4 text-zinc-400 text-sm">{book.author}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-xs text-red-400 border border-red-900/50 px-3 py-1.5 rounded-md hover:bg-red-950 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}