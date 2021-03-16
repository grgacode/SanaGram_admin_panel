import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile, title, setTitle, text, setText }) => {
    const {url, progress} = useStorage(file, title, text);
    console.log(url, progress);

    useEffect(() => {
        if(url){
            setFile(null);
            setTitle(null);
            setText(null);
        }
    }, [url, setFile])    

    return (
        <div className ='progress-bar' style={{width: progress + '%'}}></div>
    )
}

export default ProgressBar;