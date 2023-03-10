import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Catalog from './pages/Catalog';
import CatalogMobile from './pages/CatalogMobile';
import { useMediaQuery, Theme } from '@mui/material';

export default function App() {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const isMobile = !matches;
  const CatalogComponent = isMobile ? CatalogMobile : Catalog;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalogo" />}></Route>
      <Route path="catalogo" element={<CatalogComponent />} />
      <Route path="catalogo/favoritos" element={<CatalogComponent favorites />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
