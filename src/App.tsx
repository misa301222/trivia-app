import React, { useRef } from 'react';
import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import Dashboard from './Components/Dashboard/Dashboard';
import SeeRooms from './Components/Rooms/See-Rooms/SeeRooms';
import EnterRoom from './Components/Rooms/Enter-Room/EnterRoom';
import ManageQuestions from './Components/Manage-Questions/ManageQuestions';
import Results from './Components/Results/Results';

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
            <Route path="/dashboard" element={<RequireAuth redirectTo='/login'><div className='page'><Dashboard /></div></RequireAuth>}></Route>
            <Route path="/seeRooms" element={<RequireAuth redirectTo='/login'><div className='page'><SeeRooms /></div></RequireAuth>}></Route>
            <Route path="/enterRoom/:generatedName/:roomId" element={<RequireAuth redirectTo='/login'><div className='page'><EnterRoom /></div></RequireAuth>}></Route>
            <Route path="/results" element={<RequireAuth redirectTo='/login'><div className='page'><Results /></div></RequireAuth>}></Route>
            <Route path="/manageQuestions" element={<RequireAuth redirectTo='/login'><div className='page'><ManageQuestions /></div></RequireAuth>}></Route>
            <Route path="/logout" element={<div ref={nodeRef} className='page'><Logout /></div>}></Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function RequireAuth({ children, redirectTo }: any) {
  // let isAuthenticated = getAuth();
  let isAuthenticated = localStorage.getItem('isLoggedIn') ? true : false;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
