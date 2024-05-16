const initialState = {
    isLoggedIn: false,
    user: null,
    accessToken: null
};
const loginReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload?.user,
                accessToken : action.payload?.token
            };
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                accessToken : action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};

export default loginReducer;