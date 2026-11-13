import React, { Suspense, lazy } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, CircularProgress } from '@mui/material';
import { theme } from './theme';
import { Shell } from './components/Shell';
import Home from './pages/Home';
import { Countries, Providers, SearchPage } from './pages/Directory';
import { AvailabilityPage, CountryDetail, NotFound, ProviderDetail, Recent } from './pages/Details';
import { About, Help } from './pages/Information';
import './styles.css';
const WorldMap = lazy(() => import('./pages/WorldMap'));

const root =
  (import.meta.hot?.data.root as Root | undefined) ?? createRoot(document.getElementById('root')!);
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="providers" element={<Providers />} />
            <Route path="countries" element={<Countries />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="provider/:slug" element={<ProviderDetail />} />
            <Route path="country/:slug" element={<CountryDetail />} />
            <Route path="availability" element={<AvailabilityPage />} />
            <Route path="recent" element={<Recent />} />
            <Route
              path="map"
              element={
                <Suspense
                  fallback={
                    <div className="loading-panel">
                      <CircularProgress aria-label="Loading world map" />
                    </div>
                  }
                >
                  <WorldMap />
                </Suspense>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="help-us" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
