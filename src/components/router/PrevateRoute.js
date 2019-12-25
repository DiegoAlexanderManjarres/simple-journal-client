import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { GlobalStateContext } from '../../context/contexts'



const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(GlobalStateContext)
    console.log('location------', rest.location.pathname)
    if (!isLoggedIn && rest.location.pathname !== '/app/login') {
        navigate('/app/login')
        return null
    }
    return <Component {...rest}/>    
}


export default PrivateRoute