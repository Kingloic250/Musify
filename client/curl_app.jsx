import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5697e97f"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { BrowserRouter, Routes, Route, Navigate } from "/node_modules/.vite/deps/react-router-dom.js?v=78f12fbc";
import { AuthProvider } from "/src/context/AuthContext.jsx";
import { PlayerProvider } from "/src/context/PlayerContext.jsx";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
import { ToastProvider } from "/src/context/ToastContext.jsx";
import Layout from "/src/components/layout/Layout.jsx";
import ProtectedRoute from "/src/components/ProtectedRoute.jsx";
import Login from "/src/pages/Login.jsx";
import Register from "/src/pages/Register.jsx";
import Home from "/src/pages/Home.jsx";
import Search from "/src/pages/Search.jsx";
import SongPage from "/src/pages/SongPage.jsx";
import ArtistPage from "/src/pages/ArtistPage.jsx";
import PlaylistPage from "/src/pages/PlaylistPage.jsx";
import Library from "/src/pages/Library.jsx";
import LikedSongs from "/src/pages/LikedSongs.jsx";
import Upload from "/src/pages/Upload.jsx";
function App() {
  console.log("App component rendered!");
  return /* @__PURE__ */ jsxDEV(BrowserRouter, { children: /* @__PURE__ */ jsxDEV(ThemeProvider, { children: /* @__PURE__ */ jsxDEV(ToastProvider, { children: /* @__PURE__ */ jsxDEV(AuthProvider, { children: /* @__PURE__ */ jsxDEV(PlayerProvider, { children: /* @__PURE__ */ jsxDEV(Routes, { children: [
    /* @__PURE__ */ jsxDEV(Route, { path: "/login", element: /* @__PURE__ */ jsxDEV(Login, {}, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 31,
      columnNumber: 47
    }, this) }, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 31,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/register", element: /* @__PURE__ */ jsxDEV(Register, {}, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 32,
      columnNumber: 50
    }, this) }, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 32,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(ProtectedRoute, { children: /* @__PURE__ */ jsxDEV(Layout, {}, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 35,
      columnNumber: 58
    }, this) }, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 35,
      columnNumber: 42
    }, this), children: [
      /* @__PURE__ */ jsxDEV(Route, { index: true, element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 36,
        columnNumber: 41
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 36,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "search", element: /* @__PURE__ */ jsxDEV(Search, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 37,
        columnNumber: 49
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 37,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "song/:id", element: /* @__PURE__ */ jsxDEV(SongPage, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 38,
        columnNumber: 51
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 38,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "artist/:id", element: /* @__PURE__ */ jsxDEV(ArtistPage, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 39,
        columnNumber: 53
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 39,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "playlist/:id", element: /* @__PURE__ */ jsxDEV(PlaylistPage, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 40,
        columnNumber: 55
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 40,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "library", element: /* @__PURE__ */ jsxDEV(Library, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 41,
        columnNumber: 50
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 41,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "liked", element: /* @__PURE__ */ jsxDEV(LikedSongs, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 42,
        columnNumber: 48
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 42,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { path: "upload", element: /* @__PURE__ */ jsxDEV(ProtectedRoute, { adminOnly: true, children: /* @__PURE__ */ jsxDEV(Upload, {}, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 45,
        columnNumber: 75
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 45,
        columnNumber: 49
      }, this) }, void 0, false, {
        fileName: "D:/AI Project/Musify/client/src/App.jsx",
        lineNumber: 45,
        columnNumber: 19
      }, this)
    ] }, void 0, true, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 35,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "*", element: /* @__PURE__ */ jsxDEV(Navigate, { to: "/", replace: true }, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 49,
      columnNumber: 42
    }, this) }, void 0, false, {
      fileName: "D:/AI Project/Musify/client/src/App.jsx",
      lineNumber: 49,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 29,
    columnNumber: 15
  }, this) }, void 0, false, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 28,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 27,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/AI Project/Musify/client/src/App.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("D:/AI Project/Musify/client/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("D:/AI Project/Musify/client/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "D:/AI Project/Musify/client/src/App.jsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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QXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBd0IsS0FBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFxRDtBQUFBLE9BcEJ2RDtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcUJBLEtBdEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F1QkEsS0F4QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXlCQSxLQTFCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMkJBLEtBNUJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E2QkEsS0E5QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQStCQTtBQUVKO0FBQUNDLEtBcENRSDtBQXNDVCxlQUFlQTtBQUFJLElBQUFHO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIkJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXMiLCJSb3V0ZSIsIk5hdmlnYXRlIiwiQXV0aFByb3ZpZGVyIiwiUGxheWVyUHJvdmlkZXIiLCJUaGVtZVByb3ZpZGVyIiwiVG9hc3RQcm92aWRlciIsIkxheW91dCIsIlByb3RlY3RlZFJvdXRlIiwiTG9naW4iLCJSZWdpc3RlciIsIkhvbWUiLCJTZWFyY2giLCJTb25nUGFnZSIsIkFydGlzdFBhZ2UiLCJQbGF5bGlzdFBhZ2UiLCJMaWJyYXJ5IiwiTGlrZWRTb25ncyIsIlVwbG9hZCIsIkFwcCIsImNvbnNvbGUiLCJsb2ciLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJBcHAuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFJvdXRlcywgUm91dGUsIE5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL2NvbnRleHQvQXV0aENvbnRleHQnO1xuaW1wb3J0IHsgUGxheWVyUHJvdmlkZXIgfSBmcm9tICcuL2NvbnRleHQvUGxheWVyQ29udGV4dCc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnLi9jb250ZXh0L1RoZW1lQ29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdFByb3ZpZGVyIH0gZnJvbSAnLi9jb250ZXh0L1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vY29tcG9uZW50cy9sYXlvdXQvTGF5b3V0JztcbmltcG9ydCBQcm90ZWN0ZWRSb3V0ZSBmcm9tICcuL2NvbXBvbmVudHMvUHJvdGVjdGVkUm91dGUnO1xuXG4vLyBQYWdlc1xuaW1wb3J0IExvZ2luIGZyb20gJy4vcGFnZXMvTG9naW4nO1xuaW1wb3J0IFJlZ2lzdGVyIGZyb20gJy4vcGFnZXMvUmVnaXN0ZXInO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9Ib21lJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9wYWdlcy9TZWFyY2gnO1xuaW1wb3J0IFNvbmdQYWdlIGZyb20gJy4vcGFnZXMvU29uZ1BhZ2UnO1xuaW1wb3J0IEFydGlzdFBhZ2UgZnJvbSAnLi9wYWdlcy9BcnRpc3RQYWdlJztcbmltcG9ydCBQbGF5bGlzdFBhZ2UgZnJvbSAnLi9wYWdlcy9QbGF5bGlzdFBhZ2UnO1xuaW1wb3J0IExpYnJhcnkgZnJvbSAnLi9wYWdlcy9MaWJyYXJ5JztcbmltcG9ydCBMaWtlZFNvbmdzIGZyb20gJy4vcGFnZXMvTGlrZWRTb25ncyc7XG5pbXBvcnQgVXBsb2FkIGZyb20gJy4vcGFnZXMvVXBsb2FkJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zb2xlLmxvZygnQXBwIGNvbXBvbmVudCByZW5kZXJlZCEnKTtcbiAgcmV0dXJuIChcbiAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgIDxUaGVtZVByb3ZpZGVyPlxuICAgICAgICA8VG9hc3RQcm92aWRlcj5cbiAgICAgICAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgICAgICAgPFBsYXllclByb3ZpZGVyPlxuICAgICAgICAgICAgICA8Um91dGVzPlxuICAgICAgICAgICAgICAgIHsvKiBQdWJsaWMgYXV0aCByb3V0ZXMgKi99XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbG9naW5cIiBlbGVtZW50PXs8TG9naW4gLz59IC8+XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVnaXN0ZXJcIiBlbGVtZW50PXs8UmVnaXN0ZXIgLz59IC8+XG5cbiAgICAgICAgICAgICAgICB7LyogTWFpbiBhcHAgbGF5b3V0IChwcm90ZWN0ZWQgYnkgZGVmYXVsdCkgKi99XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PFByb3RlY3RlZFJvdXRlPjxMYXlvdXQgLz48L1Byb3RlY3RlZFJvdXRlPn0+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgaW5kZXggZWxlbWVudD17PEhvbWUgLz59IC8+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cInNlYXJjaFwiIGVsZW1lbnQ9ezxTZWFyY2ggLz59IC8+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cInNvbmcvOmlkXCIgZWxlbWVudD17PFNvbmdQYWdlIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJhcnRpc3QvOmlkXCIgZWxlbWVudD17PEFydGlzdFBhZ2UgLz59IC8+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cInBsYXlsaXN0LzppZFwiIGVsZW1lbnQ9ezxQbGF5bGlzdFBhZ2UgLz59IC8+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cImxpYnJhcnlcIiBlbGVtZW50PXs8TGlicmFyeSAvPn0gLz5cbiAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibGlrZWRcIiBlbGVtZW50PXs8TGlrZWRTb25ncyAvPn0gLz5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIEFkbWluIG9ubHkgKi99XG4gICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cInVwbG9hZFwiIGVsZW1lbnQ9ezxQcm90ZWN0ZWRSb3V0ZSBhZG1pbk9ubHk+PFVwbG9hZCAvPjwvUHJvdGVjdGVkUm91dGU+fSAvPlxuICAgICAgICAgICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgICAgICAgICB7LyogQ2F0Y2ggYWxsICovfVxuICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiKlwiIGVsZW1lbnQ9ezxOYXZpZ2F0ZSB0bz1cIi9cIiByZXBsYWNlIC8+fSAvPlxuICAgICAgICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgICAgIDwvUGxheWVyUHJvdmlkZXI+XG4gICAgICAgICAgPC9BdXRoUHJvdmlkZXI+XG4gICAgICAgIDwvVG9hc3RQcm92aWRlcj5cbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICA8L0Jyb3dzZXJSb3V0ZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdLCJmaWxlIjoiRDovQUkgUHJvamVjdC9NdXNpZnkvY2xpZW50L3NyYy9BcHAuanN4In0=