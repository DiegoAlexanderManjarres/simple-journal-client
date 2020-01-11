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
import { LoadingFull } from '../../pages/common/loading'
import '../../../styles/global-styles.module.scss'
import containerThemes from '../../../styles/containers/containerThemes'



/**
 * Components checks with backend to see if user is currently logged in,
 * important for dinamic routes criteria
 */
const CheckUserStatus = ({ children }) => {
    const dispatch = useContext(GlobalDispatchContext)
    const [loading, setLoading] = useState(true)

    // Will implement from youtube video a way to cancel the axios request
    // in useEffect
    useEffect(() => {     
        
        const getAuthenticationStatus = async () => {
            let response

            try {

                response = await axiosClient(ISLOGGED_IN__QUERY)
                if (!response) { throw new Error('unable to fetch data') }

            } catch(error) {

                setLoading(false)
                dispatch({ 
                    type: 'TOGGLE_LOGGIN_STATUS',
                    payload: { isLoggedIn: false }
                })

            } 

            dispatch({ 
                type: 'TOGGLE_LOGGIN_STATUS',
                payload: { ...response.data }
            })

            setLoading(false)
        }

        getAuthenticationStatus()        

        return () => {
            axiosCancel()
        }          
    }, [dispatch]) 

    return loading ? <LoadingFull /> : <>{children}</> 
}


// components that houses the app navigator and footer
const MainContent = ({ children }) => {
    const { name } = useContext(ThemeContext)
    const theme = containerThemes[name] 
    return (
        <div className={theme.app_container}>
            <Navigator />
            <>{children}</>
            <Footer />
        </div>  
    )
}



const MainLayout = ({ children }) => (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECATCHA_CLIENT_KEY}>
        <GLOBAL_STATE_CONTEXT_PROVIDER>  
            <CheckUserStatus>   
                <MainContent>
                    {children}
                </MainContent>                    
            </CheckUserStatus>            
        </GLOBAL_STATE_CONTEXT_PROVIDER>
    </GoogleReCaptchaProvider>        
)    



export default MainLayout