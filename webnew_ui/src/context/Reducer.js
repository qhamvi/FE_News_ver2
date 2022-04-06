const reducer = (state, action) =>{
    switch(action.type){
        case "LOGIN_BEFORE" : return {
            user: null
        }
        case "LOGIN_SUCCESS" : return {
            user: action.payload
        }
        case "LOGOUT" : return {
            user: null
        }
        default: return state
    }
}

export default reducer