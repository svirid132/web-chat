import { 
    GET_HISTORY,
    SET_HISTORY,
    SEND_NEW_MESSAGE,
    SET_NEW_MESSAGE,
    ADD_NEW_USER,
    REMOVE_USER,
 } from "../actions/webchat";

 export const getHistory = () => {
     return {
         type: GET_HISTORY,
     }
 }

 export const setHistory = (history) => {
    return {
        type: SET_HISTORY,
        payload: history
    }
}

export const sendNewMessage = (message) => {
    return {
        type: SEND_NEW_MESSAGE,
        payload: message
    }
}

export const setNewMessage = (message) => {
    return {
        type: SET_NEW_MESSAGE,
        payload: message
    }
}

export const addNewUser = (user) => {
    return {
        type: ADD_NEW_USER,
        payload: user
    }
}

export const removeUser = (user) => {
    return {
        type: REMOVE_USER,
        payload: user
    }
}