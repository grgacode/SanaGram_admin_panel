import {useState, useEffect} from 'react';
import { projectStorage, projectFirestore, timestamp} from '../firebase/config';

const useStorage = (file, title, text) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //reference
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();            
            const createdAt = timestamp();
            console.log(file.name + " - " + title + " - " + text + " - TO JE TAJ DZEZ")
            await collectionRef.add({ title, text, url, createdAt });
            setUrl(url);
        })
    }, [file])
    
    return {progress, url, error};
}

export default useStorage;