export const actionTypes = {
    SET_ACTIVE_CARD: 'SET_ACTIVE_CARD',
    SET_CURRENT_TYPE: 'SET_CURRENT_TYPE'
};

export const setActiveCard = (cardType, data) => ({
    type: actionTypes.SET_ACTIVE_CARD,
    payload: { cardType, data }
});

export const setCurrentType = (cardType) => ({
    type: actionTypes.SET_CURRENT_TYPE,
    payload: cardType
});