import Sidebar from './Sidebar';
import Player from './Player';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg-base)' }}>
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto pb-24 relative"
        style={{ marginLeft: 240, marginRight: 360 }}
        id="main-content"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Player />
    </div>
  );
}
