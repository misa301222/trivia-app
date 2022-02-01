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
import SeeScores from './Components/See-Scores/SeeScores';
import SeeResults from './Components/See-Results/SeeResults';
import Config from './Components/Config/Config';
import EditUserProfile from './Components/User-Profile/Edit-User-Profile/EditUserProfile';
import SeeUserProfile from './Components/User-Profile/See-User-Profile/SeeUserProfile';
import SearchUsers from './Components/Search-Users/SearchUsers';

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
            <Route path="/seeResults" element={<RequireAuth redirectTo='/login'><div className='page'><SeeResults /></div></RequireAuth>}></Route>
            <Route path="/seeScores" element={<RequireAuth redirectTo='/login'><div className='page'><SeeScores /></div></RequireAuth>}></Route>
            <Route path="/config" element={<RequireAuth redirectTo='/login'><div className='page'><Config /></div></RequireAuth>}></Route>
            <Route path="/editUserProfile" element={<RequireAuth redirectTo='/login'><div className='page'><EditUserProfile /></div></RequireAuth>}></Route>
            <Route path="/seeUserProfile" element={<RequireAuth redirectTo='/login'><div className='page'><SeeUserProfile /></div></RequireAuth>}></Route>
            <Route path="/searchUsers" element={<RequireAuth redirectTo='/login'><div className='page'><SearchUsers /></div></RequireAuth>}></Route>
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
