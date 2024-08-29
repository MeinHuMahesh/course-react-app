import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './component/CourseList';
import AddCourse from './component/AddCourse';
import CourseDetail from './component/CourseDetails';
import AddInstance from './component/AddInstance';
import ListInstance from './component/ListInstance';
import './App.css';
import InstanceDetails from './component/InstanceDetails';
import AppNavbar from './component/NavBar';

function App() {
  return (
    <Router>
      <AppNavbar/>
    <div className="App">
    <Routes>
      
       <Route path="/" element={<AddCourse/>}/>
     
      
      <Route path="/instancelist" element={<ListInstance/>} />
      <Route path="/courselist" element={<CourseList/>} /> 
      <Route path="/instance/:year/:semester/:courseID" element={<InstanceDetails/>}/>
      <Route path='/addInstance' element={<AddInstance/>} />
      <Route path="/course/:id" element={<CourseDetail/>} />
      </Routes>
    </div>
    
    </Router>
  );
}

export default App;
