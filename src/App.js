import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/navbar/navbar";
import News from "./component/news/news";
import category from "./component/navbar/category.json";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  pageSize = 8;
  render() {
    return (
      <Router>
        <div>
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
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
                      setProgress={this.setProgress}
                      key={value.category}
                      pageSize={this.pageSize}
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
  }
}
