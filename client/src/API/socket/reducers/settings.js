import {socket} from "../socket";
import { 
    CONNECTION,
    ADD_USERNAME,
    GET_NAME_LIST,
    SET_NAME_LIST,
    ADD_MY_ID,
    SET_FINAL_USERNAME
 } from "../actions/settings";

const initState = {
    isConnection: false,
    user: null,
    nameList: null,
}

function settings (state = initState, action) {
    const newState = Object.assign({}, state);
    const newUser = Object.assign({}, state.user);
    switch(action.type) {
        case CONNECTION: 
            newState.isConnection = true;
            return newState;
        case ADD_USERNAME:
            newUser.name = action.payload;
            newState.user = newUser;
            socket.emit("add user", action.payload);
            return newState;
        case GET_NAME_LIST: {
            socket.emit("list name");
            return state;
        }
        case SET_NAME_LIST:
            newState.nameList = action.payload;
            return newState;
        case ADD_MY_ID: {
            socket.emit("history");//После авторизации запрашиваем историю сообщений
            newUser.id = action.payload;
            newState.user = newUser;
            return newState;
        }
        case SET_FINAL_USERNAME: {
            newUser.name = action.payload;
            newState.user = newUser;
            return newState;
        }
        default:
            return state;
    }
}

export default settings;