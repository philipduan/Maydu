//Action Creator 
const GET_SESSION_INFO = 'GET_SESSION_INFO';
const GET_SESSION_INFO_LOADING = 'GET_SESSION_INFO_LOADING';

export const getSessionInfo = (data) => ({
    type: GET_SESSION_INFO,
    payload: data
});

export const getSessionLoading = () => ({
    type: GET_SESSION_INFO_LOADING
})
//Middleware 

//Reducer 

export default function (state = { profileData: {}, isLoading: false }, action) {
    switch (action.type) {
        case GET_SESSION_INFO_LOADING:
            return { ...state, isLoading: true }
        case GET_SESSION_INFO:
            return { ...state, profileData: action.payload, isLoading: false }
        default:
            return state
    }
}
