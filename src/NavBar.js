import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

const StyledHeader = styled('header')`
  background-color: #333;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => (
  <StyledHeader>
    <StyledLink to="/">Adopt Me!</StyledLink>
    <StyledLink to="/search">
      <span aria-label="search" role="img">
        🔍
      </span>
    </StyledLink>
  </StyledHeader>
);

export default NavBar;
