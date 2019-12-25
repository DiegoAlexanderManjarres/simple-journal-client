import React from "react"
import { navigate } from 'gatsby'
import { GlobalStateContext } from '../context/contexts'


/* 
    - Must create a series of pages that are: public, private, regular
        - login: public
        - register: public
        - about: regular
        - dashboard: private 
        - addEntry/ editEntry: private
        - viewEntry: private    
*/




const MainPage = () => {
    const { isLoggedIn } = React.useContext(GlobalStateContext)
    navigate(`/app/${isLoggedIn ? 'dashboard' : 'login'}`) 
    return null
} 



export default MainPage