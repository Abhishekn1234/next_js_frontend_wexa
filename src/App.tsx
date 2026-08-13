import "./App.css";
import {  Route, Routes } from "react-router-dom";

import Layout from "./features/components/layout/Layout";
import Dashboard from "./features/pages/Dashboard/Dashboard";
import Developers from "./features/pages/Developers/Developers";
import Jobs from "./features/pages/Jobs/Jobs";
import Skills from "./features/pages/Skills/Skills";
import Projects from "./features/pages/Projects/Projects";
import Recommendations from "./features/pages/Recommendations/Recommendations";



function App() {
  return (
   
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/developers"
            element={<Developers/>}
          />

          <Route
            path="/jobs"
            element={<Jobs/>}
          />

          <Route
            path="/skills"
            element={<Skills/>}
          />

          <Route
            path="/projects"
            element={<Projects/>}
          />

          <Route
            path="/recommendations/:developerId"
            element={<Recommendations />}
          />
        </Route>
      </Routes>
    
  );
}

export default App;