const RECEIVE_DIALOG = 'RECEIVE_DIALOG';
const RECEIVE_DIALOG_ERROR = 'PULL_DIALOG_ERROR';

const dialog = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DIALOG: {
      return {
        ...state,
        dialog: action.receivedDialog,
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

export const receiveDialog = (receivedDialog) => ({
  type: RECEIVE_DIALOG,
  receivedDialog,
});

export const pullDialogError = (error) => ({
  type: RECEIVE_DIALOG_ERROR,
  error,
});

export default dialog;
