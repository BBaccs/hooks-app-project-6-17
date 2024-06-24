import { useState } from 'react';

export function useToggle({btnId}) {
    console.log(btnId)
    const [toggleState, setToggle] = useState({state: false, btnId: btnId});
    // const toggle = (cardId) => {
    //     setToggle(prevData => ({
    //         ...prevData,
    //         [cardId]: !prevData[cardId]
    //     }));
    // };
    console.log(toggleState)

    return { toggleState, setToggle };
}