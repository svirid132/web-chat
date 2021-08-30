import {socket} from "../socket";
import { 
    GET_HISTORY,
    SET_HISTORY,
    SEND_NEW_MESSAGE,
    SET_NEW_MESSAGE,
    ADD_NEW_USER,
    REMOVE_USER,
 } from "../actions/webchat";

const initState = {
    messages: null,//смесь сообщений специальных и обычных
    users: null,
    countSpecialMessage: 0,
}

function webchat (state = initState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case GET_HISTORY: 
            socket.emit("history");
            break;
        case SET_HISTORY:
            newState.messages = action.payload.messages;
            newState.users = action.payload.users;
            return newState;
        case SEND_NEW_MESSAGE:
            socket.emit("new message", action.payload);
            break;
        case SET_NEW_MESSAGE:
            const newMessages = Object.assign([], newState.messages);
            newMessages.push(action.payload);
            newState.messages = newMessages;
            return newState;
        default:

    }


    switch(action.type) {
        case ADD_NEW_USER: {
            //actionPayload
            const newMessages_add = Object.assign([], newState.messages);
            const newUsers_add = Object.assign([], newState.users);
            newUsers_add.push(action.payload);
            newState.users = newUsers_add;

            //Новое специальное сообщение
            newState.countSpecialMessage += 1;
            const idSpecialMessage_add = -newState.countSpecialMessage;//Отридцательный id для специального сообщения
            newMessages_add.push({id: idSpecialMessage_add, name: "добавился", text: action.payload.name});
            newState.messages = newMessages_add;

            return newState;
        }
        case REMOVE_USER: {
            const newMessages_remove = Object.assign([], newState.messages);
            const newUsers_remove = state.users?.filter((user) => user.id !== action.payload.id);
            newState.users = newUsers_remove;

            //Новое специальное сообщение
            newState.countSpecialMessage += 1;
            const idSpecialMessage_remove = -newState.countSpecialMessage;
            newMessages_remove.push({id: idSpecialMessage_remove ,name: "отсоединился", text: action.payload.name});
            newState.messages = newMessages_remove;

            return newState;
        }
        default:
    }

    return state;
}

export default webchat;