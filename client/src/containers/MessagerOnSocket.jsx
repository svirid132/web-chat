import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { sendNewMessage } from "../API/socket/actionCreators/webchat";
import { Messager } from "../components";

const mapStateToProps = (state, ownProps) => ({
    user: state.socket.settings.user,
    users: state.socket.webchat.users,
    messages: state.socket.webchat.messages,
    className: ownProps.className,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({sendNewMessage}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)
    (Messager);