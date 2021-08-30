import { SET_MY_STREAM, ADD_STREAM, CREATE_STREAM, REMOVE_STREAM } from "./actions";

export const addStream = (id) => ({
    type: ADD_STREAM,
    payload: id,
});

export const removeStream = (id) => ({
    type: REMOVE_STREAM,
    payload: id,
});

export const setMyStream = (id, audio, video) => ({
    type: SET_MY_STREAM,
    payload: {id, audio, video},
});

export const createStream = (audio, video) => ({
    type: CREATE_STREAM,
    payload: {audio, video},
});

