import { ADD_STREAM, CREATE_STREAM, REMOVE_STREAM, SET_MY_STREAM } from "./actions";
import { createStream } from "./peer";

const initState = {
    myPeer: {
        id: null,
        video: true,
        audio: true,
    },
    userPeers: [],
} 

function peer(state = initState, action) {
    switch(action.type) {
        case SET_MY_STREAM: {
            const newState = Object.assign({}, state);
            // const newMyPeer = Object.assign({}, state.myPeer);
            // newMyPeer.id = action.payload.id;
            // newMyPeer.stream = action.payload.stream;
            const newMyPeer = action.payload;
            newState.myPeer = newMyPeer;
            return newState;
        }
        case ADD_STREAM: {
            const newState = Object.assign({}, state);
            const newUserPeers = Object.assign([], state.userPeers);
            newState.userPeers = newUserPeers;
            if (state.myPeer.id === action.payload.id) return state;
            if (state.userPeers.map((user) => user.id).includes(action.payload.id)) return newState;

            newUserPeers.push({id: action.payload.id});
            return newState;
        }
        case REMOVE_STREAM: {
            const newState = Object.assign({}, state);
            const newUserPeers = state.userPeers.filter((user) => user.id !== action.payload.id);
            newState.userPeers = newUserPeers;
            return newState;
        }
        case CREATE_STREAM: {
            const ids = state.userPeers.map((user) => user.id);
            createStream(
                action.payload.audio, 
                action.payload.video,
                ids
            );
            const newState = Object.assign({}, state);
            const newMyPeer = Object.assign({}, state.myPeer);
            newMyPeer.video = action.payload.video;
            newMyPeer.audio = action.payload.audio;
            newState.myPeer = newMyPeer;
            return newState;
        }
        default: 
            return state;    
    }
}

export default peer;