import React from "react";
import { Home, Books, Borrow, Categories, Students, Author } from "page";
import { Route, Routes } from "react-router-dom";
import path from "ultils/path";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.All} element={<Books />} />
          <Route path={path.HOME} element={<Books />} />
          <Route path={path.BOOK} element={<Books />} />
          <Route path={path.BORROW} element={<Borrow />} />
          <Route path={path.CATEGORIES} element={<Categories />} />
          <Route path={path.STUDENTS} element={<Students />} />
          <Route path={path.AUTHOR} element={<Author />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
