import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import MainList from "./Mainlist";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <MainList></MainList>
    </div>
  );
};

export default App;
