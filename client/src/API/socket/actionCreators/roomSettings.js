import { CREATED_ROOM, CREATE_ROOM, JOIN_ROOM, SET_JOIN } from "../actions/roomSettings"

export const createRoom = () => {
    return {
        type: CREATE_ROOM,
    }
}

export const createdRoom = (id) => {
    return {
        type: CREATED_ROOM,
        payload: id,
    }
}

export const joinRoom = (id) => {
    return {
        type: JOIN_ROOM,
        payload: id,
    }
} 

export const setJoin = (id, state) => {
    return {
        type: SET_JOIN,
        payload: { 
            id, 
            state
        },
    }
}