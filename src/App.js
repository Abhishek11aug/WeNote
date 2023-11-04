import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './Component/Navbar';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import About from './Component/About';
import Notes from './Component/Notes';
import Alert from './Component/Alert';
import NotesState from './Context/Notes/NotesState';
import AlertState from './Context/Notes/AlertState';
import LoginState from './Context/Notes/LoginState';


function App() {
  return (
    <>
    <LoginState>
      <AlertState>
      <NotesState>
        <Router>
          <Navbar />
          <Alert msg={"Note Update Successfully"} />
          <div className="container my-3">
            <Routes>
              <Route path="/notes" element={<Notes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<About />} />
              <Route path="/" element={<About />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NotesState>
      </AlertState>
    </LoginState>
    </>
  );
}

export default App;
