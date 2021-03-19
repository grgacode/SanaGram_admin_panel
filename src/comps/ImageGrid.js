import React, {useState}from 'react';
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion';
import { Link } from "react-router-dom"
import { projectFirestore } from '../firebase/config';
import { useAuth } from "../contexts/AuthContext";

const ImageGrid = ({ setSelectedImg, setTitle, setText, setId, setUrl }) => {
    const { docs } = useFirestore('images');
    // console.log(docs)

    const [isadmin, setIsadmin] = useState(false);
    const { currentUser } = useAuth();

    if (currentUser) {projectFirestore.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.data()) {
            setIsadmin(doc.data().admin);
            console.log(doc.data())
        } else {
            setIsadmin(false);
        }
    }).catch(err => {
        console.log(err);
    })}


    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                <motion.div className='img-wrap' key={doc.id}
                    layout
                    whileHover={{ opacity: 1 }}
                    >
                    <motion.img src={doc.url} alt="images"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => {
                            setSelectedImg(doc.url) 
                            setText(doc.text)}} />
                    <div className="image-title">
                        <p>{doc.title}</p>                        
                    </div>
                    {isadmin && <Link to="/edit" className="link-edit"
                    onClick={() => {
                        setText(doc.text)
                        setTitle(doc.title)
                        setId(doc.id)
                        setUrl(doc.url)}}>EDIT</Link>}
                </motion.div>
            ))}
        </div>
    );
}

export default ImageGrid;