import React, {useRef, useState} from 'react';
import WithSocket from '../WithSocket';
import styles from './styles.module.scss'
import Pipeline from './Pipeline';

export default function Terminal(){
    const terminalData = WithSocket("http://127.0.0.1:4001");
    const terminalRef = useRef();
    const [autoscroll, setAutoscroll] = useState(true);

    console.log(terminalData);
    if(autoscroll)
        setTimeout(() =>terminalRef.current.scrollTop = terminalRef.current.scrollHeight);
    return (
        <div>
        <button onClick={()=>setAutoscroll(!autoscroll)}>{autoscroll ? "disable autoscroll": "set autoscroll"}</button>
            <div ref={terminalRef} className={styles.terminal}>

                    {terminalData.map((item, index) => <Pipeline key={item.id} data={item}/>)}
            </div>
        </div>

    );
}
