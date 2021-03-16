import React, { useState } from 'react';
import Navbar from './comps/Navbar';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Signup from './comps/Signup';
import Login from './comps/Login';
import Upload from './comps/Upload';

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './comps/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);


  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Title />
          <PrivateRoute exact path="/" component={UploadForm}
            file={file} setFile={setFile} title={title} setTitle={setTitle} text={text} setText={setText}/>
          <ImageGrid setSelectedImg={setSelectedImg} />
          <PrivateRoute exact path="/upload" component={Upload}
            file={file} setFile={setFile} title={title} setTitle={setTitle} text={text} setText={setText}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
