import { configureStore } from '@reduxjs/toolkit';
import {default as socket} from "../API/socket/reducers";
import {default as peer} from "../API/peerjs/reducer";

// const middleware = getDefaultMiddleware({
//   immutableCheck: false,
//   serializableCheck: false,
//   thunk: true,
// });

export const store = configureStore({
  reducer: {
    socket,
    peer,
  },
});

