import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Books from './pages/Books';
import Students from './pages/Students';
import Borrow from './pages/Borrow';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="sticky top-0 z-50 flex items-center gap-6 px-8 py-4 bg-zinc-900 border-b border-zinc-800">
        <span className="mr-auto text-amber-400 font-serif text-xl tracking-wide">📚 LibraryMS</span>
        {['books', 'students', 'borrow'].map(path => (
          <NavLink
            key={path}
            to={`/${path}`}
            className={({ isActive }) =>
              `text-xs uppercase tracking-widest font-medium pb-1 border-b-2 transition-colors duration-150 ` +
              (isActive
                ? 'text-white border-amber-400'
                : 'text-zinc-500 border-transparent hover:text-white')
            }
          >
            {path}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/"         element={<Books />} />
        <Route path="/books"    element={<Books />} />
        <Route path="/students" element={<Students />} />
        <Route path="/borrow"   element={<Borrow />} />
      </Routes>
    </BrowserRouter>
  );
}