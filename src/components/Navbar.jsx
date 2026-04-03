import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Emlak İlan Sistemi</div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Ana Sayfa
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
