import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import NavBar from "./components/NavBar";
import AnimePage from "./pages/AnimePage";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [Searched, setSearched] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar Searched={Searched} setSearched={setSearched} />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/anime/:slug" element={<AnimePage />} />
          <Route path="/episode/:slug" element={<WatchPage />} />
          <Route path="/search" element={<SearchPage Searched={Searched} />} />

          {/* 404 Page: */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
