import React from 'react'
import memoryStorage from 'localstorage-memory'

/* 
    React context used for global state management, 
    in conjunction with useReducer fro state and dispatch functions
*/



// Create the data contexts with "React.createContext"
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()
export const ThemeContext = React.createContext()
export const ThemeDispatchContext = React.createContext()
export const GlobalEntriesContext = React.createContext()
export const GlobalEntriesDispatch = React.createContext()



/*  REDUCERS */

// Create a reducer function to be feed to react useReducer method
const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_LOGGIN_STATUS':
            return { ...state, ...action.payload }
        default:
            throw new Error('Somthing happened')    
    }
}


const themeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_THEME_NAME':
            return { ...state, ...action.payload }
        default:
            throw new Error('Somthing happened')    
    }
}


const EntriesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ENTRIES':
            return [...action.payload]
        case 'ADD_ENTRY':
            return [action.payload, ...state]
        case 'UPDATE_ENTRY':
            const stateToUpdate = [...state] 
            const index = stateToUpdate
                .findIndex(entrie => entrie.id === action.payload.id)
                stateToUpdate[index] = {...action.payload}
            return [...stateToUpdate]
        case 'DELETE_ENTRY':
            return [...state].filter(entry => entry.id !== action.payload)    
        default:
            return state    
    }
}



/*  INIT STATES */

const initialState = { isLoggedIn: false }

/**
 * sets theme name init states to local storage if empty
 */
const setThemeNameInitState = () => {  
    
    const _localStorage = typeof window === 'undefined' 
        ? memoryStorage
        : window.localStorage
     
    let _themeName = JSON.parse(_localStorage.getItem('theme_name'))
    console.log('constext localstorate themeName:', _themeName)
        if (!_themeName) {  
            _themeName = { name: 'DEFAULT' }       
            _localStorage.setItem('theme_name', JSON.stringify(_themeName))            
        }        
    return _themeName    
}




/* CONTEXT PROVIDERS */

const THEME_NAME_STATE_CONTEXT = ({ children }) => {  
    const initState = setThemeNameInitState()
    const [state, dispatch] = React.useReducer(themeReducer, initState)  
    return (
        <ThemeContext.Provider value={state}>
            <ThemeDispatchContext.Provider value={dispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    )
}


const ENTRIES_STATE_PROVIDER = props => {
    const [entries, entriesDispatch] = React.useReducer(EntriesReducer, [])
    return (
        <GlobalEntriesContext.Provider value={entries}>
            <GlobalEntriesDispatch.Provider value={entriesDispatch}>
                {props.children}
            </GlobalEntriesDispatch.Provider>
        </GlobalEntriesContext.Provider>
    )
}



/**
 * Globas state component that accepts other components and
 * returns the contexts providers so its children components can take
 * advantage of the state and dispatch values
 */
const GLOBAL_STATE_CONTEXT_PROVIDER = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)    

    return (
        <THEME_NAME_STATE_CONTEXT>
            <GlobalStateContext.Provider value={state}>
                <GlobalDispatchContext.Provider value={dispatch}>
                    <ENTRIES_STATE_PROVIDER>
                        {children}
                    </ENTRIES_STATE_PROVIDER>                    
                </GlobalDispatchContext.Provider>
            </GlobalStateContext.Provider>
        </THEME_NAME_STATE_CONTEXT>        
    )
}


export default GLOBAL_STATE_CONTEXT_PROVIDER