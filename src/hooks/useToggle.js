import { useState } from 'react';

export function useToggle(id) {
    const [toggleState, setToggle] = useState({});
    
    const toggle = (id) => {
        setToggle(prevData => ({
            ...prevData,
            [id]: !prevData[id]
        }));
    };

    return { toggleState, setToggle };
}