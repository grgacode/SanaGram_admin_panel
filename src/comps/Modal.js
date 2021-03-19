import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Modal = ({ selectedImg, setSelectedImg, text }) => {
    // console.log(selectedImg)

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