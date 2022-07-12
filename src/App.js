import "./App.scss";
import React, { Suspense } from "react";
import routes from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className='app'>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    element={route.component}
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
  );
}

export default App;
