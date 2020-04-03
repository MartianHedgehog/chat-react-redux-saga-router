const RECEIVE_DIALOG = 'RECEIVE_DIALOG';
const RECEIVE_DIALOG_ERROR = 'RECEIVE_DIALOG_ERROR';

const SEND_MESSAGE = 'SEND_MESSAGE';

const dialog = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DIALOG: {
      return {
        ...action.receivedDialog,
      };
    }
    case RECEIVE_DIALOG_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export const sendMessage = (name, msg) => ({
  type: SEND_MESSAGE,
  name,
  msg,
});

export const receiveDialog = (receivedDialog) => ({
  type: RECEIVE_DIALOG,
  receivedDialog,
});

export const pullDialogError = (error) => ({
  type: RECEIVE_DIALOG_ERROR,
  error,
});

export default dialog;
