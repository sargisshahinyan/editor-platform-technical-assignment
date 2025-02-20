import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";

import "./App.css";

const Home = lazy(() => import("./routes/Home"));
const PhotoDetails = lazy(() => import("./routes/PhotoDetails"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
