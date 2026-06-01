import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = 'http://localhost:7000';

function getStatus(r) {
  if (r.returned_date) return 'returned';
  if (new Date(r.due_date) < new Date()) return 'overdue';
  return 'out';
}

function fmt(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const statusStyles = {
  out:      'bg-amber-950 text-amber-400',
  overdue:  'bg-red-950  text-red-400',
  returned: 'bg-green-950 text-green-400',
};

const statusLabel = { out: 'Out', overdue: 'Overdue', returned: 'Returned' };

export default function Borrow() {
  const [records,   setRecords]   = useState([]);
  const [students,  setStudents]  = useState([]);
  const [books,     setBooks]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [studentId, setStudentId] = useState('');
  const [bookId,    setBookId]    = useState('');
  const [dueDate,   setDueDate]   = useState('');

  useEffect(() => {
    fetchRecords();
    fetchStudents();
    fetchBooks();
  }, []);

  async function fetchRecords() {
    try {
      setLoading(true); setError('');
      const { data } = await axios.get(`${BASE}/borrow`);
      setRecords(data.data);
    } catch { setError('Could not load borrow records.'); }
    finally { setLoading(false); }
  }

  async function fetchStudents() {
    try { const { data } = await axios.get(`${BASE}/students`); setStudents(data.data); } catch {}
  }

  async function fetchBooks() {
    try { const { data } = await axios.get(`${BASE}/books`); setBooks(data.data); } catch {}
  }

  async function handleBorrow(e) {
    e.preventDefault();
    if (!studentId || !bookId || !dueDate) return;
    try {
      setError('');
      await axios.post(`${BASE}/borrow`, {
        student_id: parseInt(studentId),
        book_id:    parseInt(bookId),
        due_date:   dueDate,
      });
      setStudentId(''); setBookId(''); setDueDate('');
      fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to borrow book.');
    }
  }

  async function handleReturn(id) {
    try {
      setError('');
      await axios.put(`${BASE}/borrow/${id}`);
      fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to return book.');
    }
  }

  const inputCls = "flex-1 min-w-36 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-white">Borrow</h1>
        <div className="w-12 h-0.5 bg-amber-400 mt-2 mb-1" />
        {!loading && (
          <p className="text-zinc-500 text-xs">
            {records.filter(r => !r.returned_date).length} active ·{' '}
            {records.filter(r =>  r.returned_date).length} returned
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-950 border border-red-900 text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Borrow form */}
      <form onSubmit={handleBorrow} className="flex gap-3 mb-8 flex-wrap">
        <select
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          className={inputCls + ' [color-scheme:dark]'}
        >
          <option value="">Select student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} — {s.batch}</option>
          ))}
        </select>

        <select
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          className={inputCls + ' [color-scheme:dark]'}
        >
          <option value="">Select book</option>
          {books.map(b => (
            <option key={b.id} value={b.id}>{b.title}</option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className={inputCls + ' [color-scheme:dark]'}
        />

        <button
          type="submit"
          className="px-5 py-2.5 bg-amber-400 text-zinc-900 text-sm font-semibold rounded-lg hover:bg-amber-300 active:scale-95 transition-all"
        >
          + Borrow
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin" />
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 text-sm">No borrow records yet.</div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {['#','Student','Book','Borrowed','Due','Returned','Status','Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => {
                const status = getStatus(r);
                return (
                  <tr key={r.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-4 py-4 text-zinc-600 text-xs">{i + 1}</td>
                    <td className="px-4 py-4 text-white text-sm">{r.student_name}</td>
                    <td className="px-4 py-4 text-zinc-300 text-sm">{r.book_title}</td>
                    <td className="px-4 py-4 text-zinc-500 text-xs">{fmt(r.borrowed_date)}</td>
                    <td className="px-4 py-4 text-zinc-500 text-xs">{fmt(r.due_date)}</td>
                    <td className="px-4 py-4 text-zinc-500 text-xs">{fmt(r.returned_date)}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
                        {statusLabel[status]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {!r.returned_date && (
                        <button
                          onClick={() => handleReturn(r.id)}
                          className="text-xs text-green-400 border border-green-900/50 px-3 py-1.5 rounded-md hover:bg-green-950 transition-colors"
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}