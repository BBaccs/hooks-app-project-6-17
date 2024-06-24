import { useState } from 'react';

export function useToggle() {
    const [toggleStates, setToggleStates] = useState({});

    const setToggle = (btnId) => {
        setToggleStates(prevStates => ({
            ...prevStates,
            [btnId]: !prevStates[btnId]
        }));
    };

    return { toggleStates, setToggle };
}