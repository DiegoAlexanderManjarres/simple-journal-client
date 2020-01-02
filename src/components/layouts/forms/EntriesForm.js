import React, { useContext, useState } from 'react'
import { ButtonExtend, Button } from '../buttons/buttons'
import themesForm from '../../../styles/forms/formsThemes'
import { ThemeContext } from '../../../context/contexts'



// Form component to be used for editing and adding entries
const EntryForm = props => {
    const initElementsDisplay = {
        input: 'inline',
        previous: 'none',
        next: 'inline',
        textarea: 'none',
        submit: 'none'
    }
    const { onSubmit, titleInput, contentInput, required } = props
    const { name } = useContext(ThemeContext)
    const themeForm = themesForm[name]
    const [elementsDisplay, setElementsDisplay] = useState(initElementsDisplay)
    
    const onNextClick = e => {
        setElementsDisplay({
            input: 'none',
            previous: 'inline',
            next: 'none',
            textarea: 'inline',
            submit: 'inline'
        })
    }

    const onPreviousClick = e => {
        setElementsDisplay(initElementsDisplay)
    }

    return (
               
        <form className={themeForm.entries_form} onSubmit={onSubmit}>

            <input 
                style={{ display: elementsDisplay.input }}
                type='text' 
                name='title' 
                placeholder='Title' 
                defaultValue={titleInput || ''}
                required={required || false}/>
                            
            <textarea 
                style={{ display: elementsDisplay.textarea }}
                name='content' 
                placeholder='content...'
                defaultValue={contentInput || ''}
                required={required || false}/>                  

            <div className={themeForm._entries_form_buttons_container}>

                <Button 
                    type='button' 
                    style={{ display: elementsDisplay.previous, marginRight: '1rem' }}
                    onClick={onPreviousClick}> 
                    {'<<'} 
                </Button>     

                <ButtonExtend style={{ display: elementsDisplay.submit }}>
                    Submit
                </ButtonExtend>  

                <Button 
                    type='button' 
                    style={{ 
                        display: elementsDisplay.next, 
                        justifySelf: 'flex-end'
                    }}
                    onClick={onNextClick}> 
                    {'>>'} 
                </Button>

            </div>            
                                
        </form>            
       
    )
}


export default EntryForm