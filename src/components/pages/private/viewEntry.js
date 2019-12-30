import React, { useEffect, useState, useContext } from "react"
import axiosClient, { axiosCancel } from "../../../utils/axiosConfig"
import { GET_MY_ENTRIES__QUERY } from '../../../graphql/queries'
import EditEntry from './editEntry'
import { ButtonExtend } from '../../layouts/buttons/buttons'
import { ThemeContext } from '../../../context/contexts'
import containerThemes from '../../../styles/containers/containerThemes'




const ViewEntry = props => {

    const { entryId, location: { state } } = props
    const isState = !!state

    const { name } = useContext(ThemeContext)
    const [entry, setEntry] = useState(state)
    const [isEditModal, setIsEditModal] = useState(false)
    const [theme] = useState(containerThemes[name])
    
    useEffect(() => {
        if (!isState) {
            axiosClient({ ...GET_MY_ENTRIES__QUERY, variables: { entryId }})
                .then(({ data }) => {      
                    const isDataArray = data && Array.isArray(data.entries)          
                    setEntry( isDataArray ? data.entries[0] : null)                
                })
                .catch(error => console.log(error))

            return () => {
                axiosCancel()
            } 
        }
    }, [entryId, isState])

    const handleModalClic = () => {
        setIsEditModal(!isEditModal)
    }

    if (!entry) { return <h5>Could not fetch entry</h5> }

    return (
        <div className={theme.page_container}>

            <div style={{ padding: '0.5rem' }}>
                <ButtonExtend onClick={handleModalClic} >Edit Modal</ButtonExtend>
            </div>
            
            {isEditModal && (
                <EditEntry onClick={handleModalClic} state={entry} theme={theme}/>
            )}

            <div className={theme.view_entry}>
                
                <div className={theme.space_between__container}>
                    <p>
                        <time>{new Date(entry.createdAt).toDateString()}</time>
                    </p>
                    <p>    
                        <time>{new Date(entry.createdAt).toLocaleTimeString('en-US')}</time>
                    </p>
                </div>
                
                <h1 style={{ textAlign: 'center' }}>{entry.title}</h1>
                <p>{entry.text}</p>
            </div>

        </div>
    )
}



export default ViewEntry