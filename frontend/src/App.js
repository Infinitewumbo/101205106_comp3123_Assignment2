import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;