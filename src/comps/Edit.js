import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { projectFirestore, projectStorage } from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";
import { motion } from 'framer-motion';

const Upload = ({ setFile, title, category, text, latitude, longitude, id, url }) => {

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

    //reference 
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
            await collectionRef.doc(id).update({
                title: titleRef.current.value, category: categoryRef.current.value, text: textRef.current.value,
                latitude: Number(latitudeRef.current.value), longitude: Number(longitudeRef.current.value)
            });
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
            // Create a reference from url
            const storageRefFromUrl = projectStorage.refFromURL(url);
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
        <>
            {url && <motion.div className='backdrop' onClick={clickHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                {isadmin && <form onSubmit={handleSubmit} className="login-form">
                    <h1>Edit</h1>
                    <div className="txtb">
                        <div className="double-input">
                            <input className="title-first" type="text" placeholder="Title" defaultValue={`${title}`} ref={titleRef} required />
                            <input className="category-second" type="text" placeholder="Category" defaultValue={`${category}`} ref={categoryRef} required />
                        </div>

                    </div>
                    <div className="txtb">
                        <textarea type="password" placeholder="Text" defaultValue={`${text}`} ref={textRef} required />
                    </div>
                    <div className="txtb">
                        <div className="double-input">
                            <input type="number" step="any" placeholder="latitude" defaultValue={`${latitude}`} ref={latitudeRef} required />
                            <input type="number" step="any" placeholder="longitude" defaultValue={`${longitude}`} ref={longitudeRef} required />
                        </div>
                    </div>
                    <div className="upload-form">
                        <label className="label-button-delete" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler() }}>
                            <span >Delete</span>
                        </label>
                    </div>
                    <input disabled={loading} type="submit" className="logbtn" value="Save changes"></input>
                    {error && <h5 className='alert-text'>{error}</h5>}
                </form>}
            </motion.div>}
        </>
    )
}

export default Upload;