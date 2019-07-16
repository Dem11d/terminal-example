import {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

export default function WithSocket(endpoint){

    const [data, setData] = useState([]);
    useEffect(() => {
        const socket = socketIOClient(endpoint);
        const map = {};
        socket.on("data", newData =>{
            setData(()=>{
                if(map[newData.id]){
                    map[newData.id].children.push(newData);
                }else{
                    map[newData.id] = {id:newData.id,children:[newData]}
                }
                return Object.values(map);
            });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return data;
}
