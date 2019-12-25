import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { GlobalStateContext } from '../../context/contexts'



const PublicRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(GlobalStateContext)
    if (isLoggedIn && rest.location.pathname !== '/app/dashboard') {
        navigate('/app/dashboard')
        return null
    }
    return <Component {...rest} />    
}


export default PublicRoute