import React, { useContext } from "react"
import { navigate } from 'gatsby'
import Form from '../../layouts/forms/EntriesForm'
import axiosClient from '../../../utils/axiosConfig'
import { GlobalEntriesDispatch, ThemeContext } from '../../../context/contexts'
import { EDIT_ENTRY_MUTATION, DELETE_ENTRY_MUTATION } from '../../../graphql/mutations'
import containerThemes from '../../../styles/containers/containerThemes'
import { IconButton } from '../../layouts/buttons/buttons'
import { ButtonModalClose } from '../../layouts/buttons/buttons'





const DeleteEntryButton = props => {
    const dispatch = useContext(GlobalEntriesDispatch)
    const { entryId } = props

    const handleClick = () => {       
        
        axiosClient({...DELETE_ENTRY_MUTATION, variables: { entryId }})
        .then(({ data }) => {   
            const state = {}
            if (data && data.deleteEntry) {
                state.message = 'Entry deleted!'
                dispatch({ type: 'DELETE_ENTRY', payload: entryId })
            } else {
                state.message = 'Unable to delete entry!'
            }  
            
            navigate('/app/dashboard', { state }) 
        })
        .catch(error => { throw new Error(error) }) 
    }

    return <IconButton 
                style={{ marginTop: '0.6rem' }}
                type='click' 
                onClick={handleClick} 
                imagePath='/littering.png'/>
}



const EditEntry = props => {
    const { state } = props
    const dispatch = useContext(GlobalEntriesDispatch)
    const { name } = useContext(ThemeContext)
    const theme = containerThemes[name]

    // submit to db
    const handleSubmit = e => {
        e.preventDefault()

        const title = e.target.title.value
        const text = e.target.content.value

        const  data = { title, text }

        axiosClient({ ...EDIT_ENTRY_MUTATION, variables: { data, entryId: state.id }})
            .then(({ data }) => {  
                let message = data ? 'Entry updated!' : 'Unable to update Entry' 
                if (data) {
                    dispatch({ type: 'UPDATE_ENTRY', payload: { ...data.editEntry } })
                }    
                navigate('/app/dashboard', { state: { message } })       
            })
            .catch(error => { throw new Error(error) })   
    }
    
    return (
        <div className={theme._full_vh_modal}>
            <ButtonModalClose onClick={props.onClick}>X</ButtonModalClose>
            <div className={theme.modal_content_container}>
                <h3 style={{ textAlign: 'center' }}>Edit Entry</h3>
                <Form 
                    onSubmit={handleSubmit} 
                    titleInput={state.title}
                    contentInput={state.text}/>
                <div className={theme._display_none_onLandscape}>    
                    <DeleteEntryButton entryId={state.id} /> 
                </div>
            </div>               
        </div>
    )
}



export default EditEntry