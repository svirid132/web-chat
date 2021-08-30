import { 
    CONNECTION,
    ADD_USERNAME,
    GET_NAME_LIST,
    SET_NAME_LIST,
    ADD_MY_ID,
    SET_FINAL_USERNAME
 } from "../actions/settings";

 export const connection = () => {
     return {
         type: CONNECTION,
     }
 }

 export const addUsername = (username) => {
    return {
        type: ADD_USERNAME,
        payload: username
    }
 } 

 export const getNameList = () => {
     return {
         type: GET_NAME_LIST,
     }
 }

 export const setNameList = (list) => {
     return {
        type: SET_NAME_LIST,
        payload: list
     }
 }

 export const addMyId = (id) => {
    return {
       type: ADD_MY_ID,
       payload: id
    }
}

export const setFinalUsername = (username) => {
    return {
        type: SET_FINAL_USERNAME,
        payload: username,
    }
}