import { Link } from 'react-router-dom';

function Header() {
  return (
  <header className="header">
      <div className="container">
        <div className="logo">
          <Link to='/'>Task Tracker</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Daskboard</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
