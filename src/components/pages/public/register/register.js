import React, { useState, useEffect, useContext } from "react"
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import axiosClient from '../../../../utils/axiosConfig'
import { navigate } from 'gatsby'
import { REGISTER_MUTATION } from '../../../../graphql/mutations'
import { ThemeContext } from '../../../../context/contexts'
import themesForm from '../../../../styles/containers/containerThemes'



/* 
    - Must stablish the client side for capchat, need to find out if 
      there is a gatsby way
*/


const RegisterPage = () => {
    const { name: _name } = useContext(ThemeContext)
    const [theme, setTheme] = useState(themesForm[_name])

    const [error, setError] = useState(null)
    const [recaptcha, setRecaptcha] = useState(null)
    const [are_FieldsEmpty, setAre_FieldsEmpty] = useState(true)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repeat_password, setRepeat_password] = useState() 

    useEffect(() => {
        setTheme(themesForm[_name])
    }, [setTheme, _name])

    const onChange = e => {
                 
        const fields = {
            name: () => setName(e.target.value),
            email: () => setEmail(e.target.value),
            password: () => setPassword(e.target.value),
            repeat_password: () => setRepeat_password(e.target.value),
        } 
         
        fields[e.target.name]()
    }

    const onVerify = recaptchaToken => {        
        setRecaptcha(recaptchaToken)
        console.log('recaptcha token:', recaptchaToken)
    }

    useEffect(() => {
        if (name && email && password && repeat_password) {
            setAre_FieldsEmpty(false)
        } else if (!are_FieldsEmpty) {
            setAre_FieldsEmpty(true)
        }
    }, [name, email, password, repeat_password, are_FieldsEmpty])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const repeat_password = e.target.repeat_password.value

        const variables = { data: { name, email, password, repeat_password, recaptcha } }

        let response
        try {
            response = await axiosClient({...REGISTER_MUTATION, variables })            
        } catch (error) {
            throw new Error(error)
        }  

        if (!response.data) {
            setError(response.errors[0].message)
            setTimeout(() => { setError(null) }, 5000)
            return null
        }

        navigate('/app/login')
        return null
    }

    return (
        <div className={theme.viewportCenteredForm}>
            <h1>Register</h1>
            {error && <h4>{error}</h4>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="name" 
                        onChange={onChange}/>
                </div>
                <div>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="E-mail" 
                        onChange={onChange}/>
                </div>
                <div>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        onChange={onChange}/>
                </div>
                <div>
                    <input 
                        name="repeat_password" 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={onChange}/>
                </div>
                <div>                    
                    {!are_FieldsEmpty && <GoogleReCaptcha onVerify={onVerify} />}
                </div>
                <div>
                    {console.log('button disabled?',!(!!recaptcha && !are_FieldsEmpty))}
                    <button type='submit' disabled={!(!!recaptcha && !are_FieldsEmpty)}>
                        Register
                    </button>
                </div>        
            </form>
        </div>
)}


export default RegisterPage