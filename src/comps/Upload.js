import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { projectFirestore } from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";
import { motion } from 'framer-motion';

const Upload = ({ file, setFile, setTitle, setCategory, setText, setLatitude, setLongitude }) => {

    const titleRef = useRef()
    const categoryRef = useRef()
    const textRef = useRef()
    const latitudeRef = useRef()
    const longitudeRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [isadmin, setIsadmin] = useState(false);
    const { currentUser } = useAuth();

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

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            setTitle(titleRef.current.value);
            setCategory(categoryRef.current.value);
            setText(textRef.current.value);
            setLatitude(latitudeRef.current.value);
            setLongitude(longitudeRef.current.value);
            setLoading(false)
            history.push("/")
        } catch {
            setError("Failed to upload an image")
        }
    }
    const handleChange = (e) => {
        const selected = e.target.files[0];
        const fileTypes = ['image/jpeg', 'image/png'];

        if (selected && fileTypes.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file!');
        }
    }

    const clickHandler = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setError("");
            setLoading(false);
            setFile(null);
            history.push("/");
        }
    }

    return (
        <>
            {isadmin && <motion.div className='backdrop' onClick={clickHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Upload</h1>
                    <div className="txtb">
                        <div className="double-input"> 
                            <input className="title-first" type="text" placeholder="Title" ref={titleRef} required />
                            <input className="category-second" type="text" placeholder="Category" ref={categoryRef} required />
                        </div>
                    </div>
                    <div className="txtb">
                        <textarea type="text" placeholder="Text" ref={textRef} required />
                    </div>
                    <div className="txtb">
                        <div className="double-input">
                            <input type="number" step="any" placeholder="latitude" ref={latitudeRef} required />
                            <input type="number" step="any" placeholder="longitude" ref={longitudeRef} required />
                        </div>
                    </div>
                    <div className="upload-form">
                        <label className="label-button-upload">
                            <input type="file" onChange={handleChange} required />
                            <span>Add</span>
                        </label>
                        <span className='file-name'>{file ? `${file.name.length > 25 ? file.name.substr(file.name.length - 25) : file.name}` : "No file choosen"}</span>
                    </div>
                    <input disabled={loading} type="submit" className="logbtn" value="Upload"></input>
                    {error && <h5 className='alert-text'>{error}</h5>}
                </form>
            </motion.div>}
        </>
    )
}

export default Upload;