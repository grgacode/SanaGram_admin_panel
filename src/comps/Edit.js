import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { projectFirestore, projectStorage } from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";
import { motion } from 'framer-motion';

const Upload = ({ file, setFile, title, setTitle, text, setText, id, url }) => {

    const titleRef = useRef()
    const textRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [isadmin, setIsadmin] = useState(false);
    const { currentUser } = useAuth();
    //reference
    const storageRefFromUrl = projectStorage.refFromURL(url);
    const collectionRef = projectFirestore.collection('images');



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
            // setTitle( titleRef.current.value );         
            // setText( textRef.current.value );
            await collectionRef.doc(id).update({ title: titleRef.current.value, text: textRef.current.value });

            setLoading(false)
            history.push("/")
        } catch {
            setError("Failed to edit")
        }
    }

    const deleteHandler = async () => {
        try {
            setError("")
            setLoading(true)
            // Create a reference to the file to delete
            const storageRef = projectStorage.ref(storageRefFromUrl.name);
            await storageRef.delete();
            await collectionRef.doc(id).delete();     
            console.log(storageRef.name);
            setLoading(false)
            history.push("/")
        } catch {
            setError("Failed to delete entry")
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
        <motion.div className='backdrop' onClick={clickHandler}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {isadmin && <form onSubmit={handleSubmit} className="login-form">
                <h1>Edit</h1>

                <div className="txtb">
                    <input type="text" placeholder="Title" defaultValue={`${title}`} ref={titleRef} required />
                </div>
                <div className="txtb">
                    <textarea type="password" placeholder="Text" defaultValue={`${text}`} ref={textRef} required />
                </div>
                <div className="upload-form">
                    <label className="label-button-delete" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler() }}>
                        {/* <input type="file" onChange={handleChange} required /> */}
                        <span >Delete</span>
                    </label>
                    {/* <span className='file-name'>{title ? `${title.length > 25 ? title.substr(title.length - 25) : title}` : "No file choosen"}</span> */}
                </div>
                <input disabled={loading} type="submit" className="logbtn" value="Save changes"></input>
                {error && <h5 className='alert-text'>{error}</h5>}
            </form>}
        </motion.div>
    )
}

export default Upload;