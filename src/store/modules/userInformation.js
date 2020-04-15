export const IS_USER_EXISTS = 'IS_USER_EXISTS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USERNAME = 'CREATE_USERNAME';
export const CREATE_USER_ID = 'CREATE_USER_ID';
export const USER_ERROR = 'USER_ERROR';

// Reducer

const userInformation = (state = {}, action) => {
  switch (action.type) {
    case IS_USER_EXISTS: {
      return {
        ...state,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        username: action.username,
        userId: action.userId,
      };
    }
    case CREATE_USER: {
      return {
        ...state,
        username: action.username,
        userId: action.userId,
      };
    }
    case CREATE_USERNAME: {
      return {
        ...state,
        username: action.username,
      };
    }
    case CREATE_USER_ID: {
      return {
        ...state,
        userId: action.userId,
      };
    }
    case USER_ERROR: {
      return {
        ...state, // TODO error case handling
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

// Actions creators

export const isUserExists = () => ({
  type: IS_USER_EXISTS,
});

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO,
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
  };
};

export const createUser = (username, userId) => {
  if (username && userId) {
    return {
      type: CREATE_USER,
      username,
      userId,
    };
  }
  if (username) {
    return {
      type: CREATE_USERNAME,
      username,
    };
  }
  if (userId) {
    return {
      type: CREATE_USER_ID,
      userId,
    };
  }
  return {
    type: USER_ERROR,
  };
};

export default userInformation;
