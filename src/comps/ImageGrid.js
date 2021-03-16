import React from 'react';
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images');
    // console.log(docs)


    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                <motion.div className='img-wrap' key={doc.id}
                    layout
                    whileHover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(doc.url)}>
                    <motion.img src={doc.url} alt="images"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} />
                    <div className="image-title">
                        <p>{doc.title}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default ImageGrid;