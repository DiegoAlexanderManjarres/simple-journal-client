import React, { useContext } from 'react'
import buttonsTheme from '../../../styles/buttons/buttonTheme'
import { ThemeContext } from '../../../context/contexts'



// base default button
export const Button = props => {
    const { type, onClick, onSubmit, children, style, disabled, _className } = props
    const { name } = useContext(ThemeContext)
    return (
        <button
            type={type || 'submit'}
            onClick={onClick}
            onSubmit={onSubmit}
            style={style} 
            disabled={disabled}
            className={buttonsTheme[name][_className || 'button']}
            >{children}
        </button>
    )
}


// button extends to parent width
export const ButtonExtend = ({ _className, ...rest }) => (
    <Button _className={'button_extend'} {...rest}/>
)

/**
 * IconButton defaults to app trash icon butt it can be overrided with
 * props imgpath, imgeStyle alt 
 */
export const IconButton = ({ _className, imagePath, ...rest }) => (
    <Button _className={'icon_button'} {...rest}>
        <img  
            style={rest.imageStyle || {
                display: 'block',
                height: 'auto',
                width: '100%',
            }} 
            src={imagePath} 
            alt={rest.alt || 'trash icon'}/>
    </Button>
)


export const ButtonModalClose = ({ _className, ...rest}) => (
    <Button _className={'_button_modal_close'} {...rest} />
)