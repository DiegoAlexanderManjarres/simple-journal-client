import React, { useContext, useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import axiosClient, { axiosCancel } from '../../../utils/axiosConfig'
import { ISLOGGED_IN__QUERY } from '../../../graphql/queries'
import GLOBAL_STATE_CONTEXT_PROVIDER, { 
    GlobalDispatchContext,
    ThemeContext,
} from '../../../context/contexts'
import Navigator from '../header/Navigator'
import Footer from '../footer'
import Loading from '../../pages/common/loading'
import '../../../styles/global-styles.module.scss'
import containerThemes from '../../../styles/containers/containerThemes'



/**
 * Components checks with backend to see if user is currently logged in,
 * important for dinamic routes criteria
 */
const CheckUserStatus = ({ children }) => {
    const dispatch = useContext(GlobalDispatchContext)
    const [loading, setLoading] = useState(true)
    // Will implement form youtube video a way to cancel the axios request
    // in useEffect
    useEffect(() => {        
        axiosClient(ISLOGGED_IN__QUERY)
            .then(({ data, errors }) => {
                dispatch({ 
                    type: 'TOGGLE_LOGGIN_STATUS',
                    payload: { ...data }
                })

                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                dispatch({ 
                    type: 'TOGGLE_LOGGIN_STATUS',
                    payload: { isLoggedIn: false }
                })
            })

        return () => {
            axiosCancel()
        }          
    }, [dispatch]) 

    return loading ? <Loading /> : <>{children}</> 
}



const MainContent = ({ children }) => {
    const state = useContext(ThemeContext)
    const [theme, setTheme] = useState(containerThemes[state.name])

    useEffect(() => {                      
        setTheme(containerThemes[state.name])  
    }, [state.name])

    return (
        <div className={theme.app_container}>
            <Navigator />
            <>{children}</>
            <Footer />
        </div>  
    )
}



const MainLayout = ({ children }) => {     
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.RECATCHA_CLIENT_KEY}>
            <GLOBAL_STATE_CONTEXT_PROVIDER>  
                <CheckUserStatus>   
                    <MainContent>
                        {children}
                    </MainContent>                    
                </CheckUserStatus>            
            </GLOBAL_STATE_CONTEXT_PROVIDER>
        </GoogleReCaptchaProvider>        
    )    
}


export default MainLayout