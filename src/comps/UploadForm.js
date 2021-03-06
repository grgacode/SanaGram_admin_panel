import React, { useState } from 'react'
import ProgressBar from './ProgressBar';

import {projectFirestore} from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const [isadmin, setIsadmin] = useState(false);
    const { currentUser } = useAuth();
    console.log(currentUser.uid)

    projectFirestore.collection('users').doc(currentUser.uid).get().then(doc => {
        
        if(doc.data()){
            setIsadmin(doc.data().admin);
            console.log(doc.data())
        } else {
            setIsadmin(false);
        }
    }).catch(err => {
        console.log(err);
    })

    const handleChange = (e) => {
        const selected = e.target.files[0];
        const fileTypes = ['image/jpeg', 'image/png'];
        

        if(selected && fileTypes.includes(selected.type)){
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file!');
        }
    }
    return (
        <>
        {isadmin && <form>
            <label className='label-button'>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div className='file'>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>}
        </>
    );
}
 
export default UploadForm;