import React, { useState, useContext } from "react"
import Form from '../../layouts/forms/EntriesForm'
import { ADD_ENTRY_MUTATION } from '../../../graphql/mutations'
import axiosClient from '../../../utils/axiosConfig'
import { ButtonModalClose } from '../../layouts/buttons/buttons'
import { ThemeContext } from '../../../context/contexts'
import containerThemes from '../../../styles/containers/containerThemes'


// adds entry component to db and updates given state
const AddEntry = props => {
const { dispatchEntries, modalHandleClick } = props
const [anError, setAnError] = useState(null)
const { name } = useContext(ThemeContext)
const theme = containerThemes[name]

    const handleSubmit = e => {
        e.preventDefault()

        const title = e.target.title.value
        const text = e.target.content.value

        const  data = { title, text }

        axiosClient({ ...ADD_ENTRY_MUTATION, variables: { data } })
            .then(({ data, errors }) => {  

                if (errors) { return setAnError(errors[0].message) }

                // dispatch props from parent sets the entries
                dispatchEntries({ type: 'ADD_ENTRY', payload: data.addEntry })

                // the modalHandleClick props passed from parent closes the modal
                modalHandleClick()      
            })
            .catch(error => { throw new Error(error) })   
    }
    
    return (
        <div className={theme._full_vh_modal}>
            <ButtonModalClose onClick={modalHandleClick}>X</ButtonModalClose>
            <div className={theme.modal_content_container}>
                <h1 style={{ textAlign: 'center' }}>Add Entry</h1>
                {anError && <h5>{anError}</h5>}
                <Form onSubmit={handleSubmit} />
            </div>           
        </div>
    )
}



export default AddEntry