import React, {useState} from 'react';
import Navbar from './comps/Navbar';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Signup from './comps/Signup';
import Login from './comps/Login';

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './comps/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [selectedImg, setSelectedImg] =  useState(null);


  return (
    <div className="App">
      <Router>
        <AuthProvider>          
          <Navbar />
          <Title />          
          <PrivateRoute exact path="/" component={UploadForm} />
          <ImageGrid setSelectedImg={setSelectedImg} />          
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}         
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
