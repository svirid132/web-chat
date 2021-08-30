import { CREATE_ROOM, JOIN_ROOM, CREATED_ROOM, SET_JOIN } from "../actions/roomSettings";
import {socket} from "../socket";
import STATE_JOIN from "../STATE_JOIN";

const initState = {
    id: null,
    stateJoin: STATE_JOIN.WAIT_JOIN,
}

function roomSettings (state = initState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case CREATE_ROOM:
            socket.emit("create room");
            return state;
        case CREATED_ROOM:
            newState.id = action.payload;
            return newState;
        case JOIN_ROOM:
            socket.emit("join room", action.payload);
            return state;
        case SET_JOIN:
            newState.id = action.payload.id;
            newState.stateJoin = action.payload.state; 
            return newState;
        default:
            return state;
    }
}

export default roomSettings;