import React, { useContext } from 'react'
import { ButtonExtend } from '../buttons/buttons'
import themesForm from '../../../styles/forms/formsThemes'
import { ThemeContext } from '../../../context/contexts'



const EntryForm = props => {
    const { onSubmit, titleInput, contentInput, required } = props
    const { name } = useContext(ThemeContext)
    const themeForm = themesForm[name]
    return (
        <form className={themeForm.entries_form} onSubmit={onSubmit}>
            <input 
                type='text' 
                name='title' 
                placeholder='Title' 
                defaultValue={titleInput || ''}
                required={required || false}/>
        
        
            <textarea 
                name='content' 
                placeholder='content...'
                defaultValue={contentInput || ''}
                required={required || false}/>
        
        
            <ButtonExtend>Submit</ButtonExtend>                    
        </form>
    )
}


export default EntryForm