// Define action types
export const actionTypes = {
    SET_ACTIVE_CARD: 'SET_ACTIVE_CARD'
};

// Action creator for setting the active card
export const setActiveCard = (cardType, data) => ({
    type: actionTypes.SET_ACTIVE_CARD,
    payload: { cardType, data }
});
