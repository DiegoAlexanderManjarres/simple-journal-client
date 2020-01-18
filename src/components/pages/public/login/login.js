import React, { useContext, useState, useEffect } from "react"
import { Link } from '@reach/router'
import Loading from '../../common/loading'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { navigate } from 'gatsby'
import axiosClient from '../../../../utils/axiosConfig'
import { LOGIN_MUTATION } from '../../../../graphql/mutations'
import { 
    GlobalStateContext, 
    GlobalDispatchContext,
} from '../../../../context/contexts'

import Form from '../../../layouts/forms/Form_centeredViewPort'
import style from '../../../../styles/containers/containerThemes'
import { Button } from '../../../layouts/buttons/buttons'



const LoginPage = () => {
    const state = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)

    const [recaptcha, setRecaptcha] = useState(null)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [are_FieldsEmpty, setAre_FieldsEmpty] = useState(true)
    const [error, setError] = useState(null) 
    const [loading, setLoading] = useState(false)
    
    const onVerify = recaptchaToken => {        
        setRecaptcha(recaptchaToken)
        // console.log('recaptcha token:', recaptchaToken)
    }

    const onChange = e => {
                 
        const fields = {            
            email: () => setEmail(e.target.value),
            password: () => setPassword(e.target.value)            
        } 
         
        fields[e.target.name]()
    }

    useEffect(() => {
        if (email && password) {
            setAre_FieldsEmpty(false)
        } else if (!are_FieldsEmpty) {
            setAre_FieldsEmpty(true)
        }
    }, [email, password, are_FieldsEmpty])

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        const password = e.target.password.value

        axiosClient({ ...LOGIN_MUTATION, variables: { data: { email, password, recaptcha } } })
            .then(({ data }) => {
                
                if (!data) { 
                    setError('Unable to athenticate')
                    setLoading(false)
                    return null 
                }

                dispatch({ 
                    type: 'TOGGLE_LOGGIN_STATUS',
                    payload: { ...state, isLoggedIn: true }
                }) 

                navigate('/app/dashboard')

                return null                         
            })
            .catch(error => { 
                setLoading(false)
                throw new Error(error) 
            })                
    }
    
    const titleHeader = 'Welcome to Simple Journal'

    if (loading) { return <Loading /> }

    return (
        <div style={{
            maxWidth: '50rem',
            minHeight: '100vh',
            // border: '1px solid green',
            margin: '0 auto'
        }}>
            <Form onSubmit={handleSubmit} header={titleHeader} anError={error}>
                <div className={'input_container'}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="E-mail" 
                        onChange={onChange}/>
                </div>
                <div className={'input_container'}>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        autoComplete='off'
                        onChange={onChange}/>
                </div>
                {!are_FieldsEmpty && <GoogleReCaptcha onVerify={onVerify} />}
                <div className={style.DEFAULT.space_between__container}>
                    <Button 
                        type='submit' 
                        disabled={!(!!recaptcha && !are_FieldsEmpty)}
                        >Login
                    </Button>
                    <Link to='/app/register'>Register</Link>  
                </div>    
            </Form>
        </div>
        
    )
}



export default LoginPage