import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from '../../../context/contexts'
import formThemes from '../../../styles/forms/formsThemes'






/* Login Component */
const Form_centeredViewPort = ({ children, onSubmit, header, anError }) => {
    const { name } = useContext(ThemeContext)    
    const [theme, setTheme] = useState(formThemes[name])

    useEffect(() => {
        setTheme(formThemes[name])
    }, [setTheme, name])
    

    return (
        <div className={theme.viewportCenteredForm}>  
            <h1>{header}</h1>            
            {anError && <h4>{anError}</h4> }            
            <form onSubmit={onSubmit}>
                {children} 
            </form>            
        </div>
    )
}



export default Form_centeredViewPort