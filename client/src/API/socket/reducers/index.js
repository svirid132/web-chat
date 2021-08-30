import { combineReducers } from "redux";
import webchat from "./webchat";
import settings from "./settings";
import roomSettings from "./roomSettings";

const reducer = combineReducers({
    roomSettings,
    webchat,
    settings
});

export default reducer;