import React, {useState} from 'react';

export default function Pipeline({data}) {
    const [isExpanded, setExpanded] = useState(true);

    return (<div>
        <div onClick={() => setExpanded(!isExpanded)}>
            <p>Pipeline id = {data.id}</p>
            {isExpanded && <div>
                {data.children.map(item => {
                    return <p>{item.data}</p>
                })}
            </div>}
        </div>
    </div>)
}
