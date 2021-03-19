import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg, text }) => {

    const clickHandler = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }
    return (
        <motion.div className='backdrop' onClick={clickHandler}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <motion.img src={selectedImg} alt="enlarged"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }} />
            <div className="image-text">
                <p>{text}</p>
            </div>
        </motion.div>
    );
}

export default Modal;