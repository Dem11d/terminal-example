import {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

export default function WithSocket(endpoint){
    
    const [data, setData] = useState([]);
    useEffect(() => {
        const socket = socketIOClient(endpoint);
        socket.on("data", newData =>{
            setData(d=>[...d, newData]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return data;
}