import React, {useRef} from 'react';
import WithSocket from '../WithSocket';
import { spawn } from 'child_process';
import styles from './styles.module.scss'

export default function Terminal(){
    const terminalData = WithSocket("http://127.0.0.1:4001");
    const terminalRef = useRef();

    setTimeout(() =>terminalRef.current.scrollTop = terminalRef.current.scrollHeight);
    return (<div ref={terminalRef} className={styles.terminal}>

                {terminalData.map((item, index) => (<div className={styles.node} key={index}>{item}</div>))}
        </div>);
}