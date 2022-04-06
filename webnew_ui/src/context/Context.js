import { createContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

const initState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

export const Context = createContext(initState)

export const Provider = ({children}) =>{

    const[state, dispatch] = useReducer(reducer, initState)

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return (
        <Context.Provider value={{user: state.user, dispatch}}>
            {children}
        </Context.Provider>
    )
}