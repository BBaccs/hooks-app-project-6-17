import { useState } from 'react';

export function useToggle(cardId) {
    const [toggleState, setToggle] = useState({});
    const toggle = (cardId) => {
        setToggle(prevData => ({
            ...prevData,
            [cardId]: !prevData[cardId]
        }));
    };
    toggle(cardId)
    return { toggleState, setToggle };
}