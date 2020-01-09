import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter/router';
import Header from './components/header/header';
import Nav from './components/navigation/navigation';

function App() {
  return (
    <div className="App light-theme">
      <Header/>
      <div className="header-offset"></div>
      <div className="app-container main-layout">
        <div>
          <div className="nav-main__wrappper">
            <Nav />
          </div>
        </div>
        <div>
          <AppRouter/>
        </div>
        <div>Right</div>
      </div>
    </div>
  );
}
export default App;
