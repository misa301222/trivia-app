import React, { useRef } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div className="App">
      <NavBar />

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          in
          timeout={400}>
          <Routes location={location}>
            <Route path="/" element={<div className='page'><Home /></div>}></Route>
            <Route path="/login" element={<div ref={nodeRef} className='page'><div ref={nodeRef}><Login /></div></div>}></Route>
            <Route path="/logout" element={<div ref={nodeRef} className='page'><Logout /></div>}></Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
