import React, { useState, useEffect } from 'react';
import Navbar from './comps/Navbar';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Signup from './comps/Signup';
import Login from './comps/Login';
import Upload from './comps/Upload';
import Edit from './comps/Edit';

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './comps/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [text, setText] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [id, setId] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    document.title = "SanaGram"
  }, [])

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Title />
          <PrivateRoute exact path="/" component={UploadForm}
            file={file} setFile={setFile} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            text={text} setText={setText} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
          <ImageGrid setSelectedImg={setSelectedImg} setTitle={setTitle} setCategory={setCategory} setText={setText} setLatitude={setLatitude}
            setLongitude={setLongitude} setId={setId} setUrl={setUrl} />
          <PrivateRoute exact path="/upload" component={Upload}
            file={file} setFile={setFile} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            text={text} setText={setText} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
          <PrivateRoute exact path="/edit" component={Edit}
            file={file} setFile={setFile} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            text={text} setText={setText} latitude={latitude} longitude={longitude} id={id} url={url} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} text={text} />}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
