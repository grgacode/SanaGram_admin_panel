import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile, title, setTitle, category, setCategory, text, setText, latitude, setLatitude, longitude, setLongitude }) => {
    const {url, progress} = useStorage(file, title, category, text, latitude, longitude);
    console.log(url, progress);

    useEffect(() => {
        if(url){
            setFile(null);
            setTitle(null);
            setCategory(null);
            setText(null);
            setLatitude(null);
            setLongitude(null);
        }
    }, [url, setFile])    

    return (
        <div className ='progress-bar' style={{width: progress + '%'}}></div>
    )
}

export default ProgressBar;