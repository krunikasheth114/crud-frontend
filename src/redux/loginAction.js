// src/actions/loginActions.js

export const loginUser = (userData) => ({
    type: 'LOGIN',
    payload: userData,
  });

  export const registerUser = (userData) => ({
    type: 'REGISTER',
    payload: userData,
  });
  
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  