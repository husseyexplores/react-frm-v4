import React from 'preact-compat';
import { Link } from 'preact-router';

const NavBar = () => (
  <header>
    <Link href="/">Adopt Me!</Link>
    <Link href="/search">
      <span aria-label="search" role="img">
        🔍
      </span>
    </Link>
  </header>
);

export default NavBar;
