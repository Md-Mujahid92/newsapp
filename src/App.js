import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/navbar/navbar";
import News from "./component/news/news";
import category from "./component/navbar/category.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = (props) => {
  const [progress, setProgress] = useState(0);
  const pageSize = 8;

  const apiKey = process.env.REACT_APP_NEWS_API;
  return (
    <Router>
      <div>
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
              />
            }
          />

          {category.map((value) => {
            return (
              <Route
                exact
                path={`/${value.category}`}
                element={
                  <News
                    apiKey={apiKey}
                    setProgress={setProgress}
                    key={value.category}
                    pageSize={pageSize}
                    country="in"
                    category={value.category}
                  />
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
