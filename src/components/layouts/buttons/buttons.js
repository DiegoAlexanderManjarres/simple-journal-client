import React, { useContext } from 'react'
import buttonsTheme from '../../../styles/buttons/buttonTheme'
import { ThemeContext } from '../../../context/contexts'


/* Button Components  */
export const ButtonExtend = props => {
    const { type, onClick, onSubmit, children, style } = props
    const { name } = useContext(ThemeContext)
    return (
        <button
            type={type || 'submit'}
            onClick={onClick}
            onSubmit={onSubmit}
            style={style} 
            className={buttonsTheme[name].button_extend}
            >{children}
        </button>
    )
}


export const Button = props => {
    const { type, onClick, onSubmit, children, style, disabled } = props
    const { name } = useContext(ThemeContext)
    return (
        <button
            type={type || 'submit'}
            onClick={onClick}
            onSubmit={onSubmit}
            style={style} 
            disabled={disabled}
            className={buttonsTheme[name].button}
            >{children}
        </button>
    )
}


export const IconButton = props => {
    const { type, onClick, onSubmit, imagePath, style } = props
    const { name } = useContext(ThemeContext)
     
    return (
        <button
            className={buttonsTheme[name].icon_button}
            style={style}
            type={type || 'submit'}
            onClick={onClick}
            onSubmit={onSubmit}
            >
                <img  
                    style={{
                        display: 'block',
                        height: 'auto',
                        width: '100%',
                    }} 
                    src={imagePath} 
                    alt='trash icon'/>
        </button>
    )
}


export const ButtonModalClose = props => {
    const { type, onClick, onSubmit, children, style } = props
    const { name } = useContext(ThemeContext)
    return (
        <button
            type={type || 'submit'}
            onClick={onClick}
            onSubmit={onSubmit}
            sytle={style} 
            className={buttonsTheme[name]._button_modal_close}
            >{children}
        </button>
    )
}