import React, { useState } from 'react'
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';

import { projectFirestore } from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";

const UploadForm = ({ file, setFile, title, setTitle, category, setCategory, text, setText, latitude, setLatitude, longitude, setLongitude }) => {

    // const [error, setError] = useState(null);

    const [isadmin, setIsadmin] = useState(false);
    const { currentUser } = useAuth();
    console.log(currentUser.uid)

    projectFirestore.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.data()) {
            setIsadmin(doc.data().admin);
            console.log(doc.data())
        } else {
            setIsadmin(false);
        }
    }).catch(err => {
        console.log(err);
    })

    return (
        <>
            {isadmin && <form>
                <Link to="/upload" className='label-button'>
                    <div className="label-link"><span>+</span></div>
                </Link>
                <div className='output'>
                    {/* {error && <div className='error'>{error}</div>} */}
                    {file && <div className='file'>{file.name}</div>}
                    {file && <ProgressBar file={file} setFile={setFile} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
                    text={text} setText={setText} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude}/>}
                </div>
            </form>}
        </>
    );
}

export default UploadForm;