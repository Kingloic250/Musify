import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import SongPage from './pages/SongPage';
import ArtistPage from './pages/ArtistPage';
import PlaylistPage from './pages/PlaylistPage';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <PlayerProvider>
              <Routes>
                {/* Public auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main app layout (protected by default) */}
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="song/:id" element={<SongPage />} />
                  <Route path="artist/:id" element={<ArtistPage />} />
                  <Route path="playlist/:id" element={<PlaylistPage />} />
                  <Route path="library" element={<Library />} />
                  <Route path="liked" element={<LikedSongs />} />
                  
                  {/* Admin only */}
                  <Route path="upload" element={<ProtectedRoute adminOnly><Upload /></ProtectedRoute>} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PlayerProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
