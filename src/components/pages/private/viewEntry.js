import React, { useEffect, useState, useContext } from "react"
import axiosClient, { axiosCancel } from "../../../utils/axiosConfig"
import { GET_MY_ENTRIES__QUERY } from '../../../graphql/queries'
import EditEntry from './editEntry'
import { Button } from '../../layouts/buttons/buttons'
import { ThemeContext } from '../../../context/contexts'
import containerThemes from '../../../styles/containers/containerThemes'
import EditSvg from './../../../../static/assets/icons/edit.svg'



const ViewEntry = props => {
    const { entryId, location: { state } } = props

    const timeFormat = { hour: '2-digit', minute: '2-digit' }
    const _language = navigator.language
    const isState = !!state

    const { name } = useContext(ThemeContext)
    const [entry, setEntry] = useState(state)
    const [isEditModal, setIsEditModal] = useState(false)
    const theme = containerThemes[name]

    useEffect(() => {

        if (!isState) {
            axiosClient({ ...GET_MY_ENTRIES__QUERY, variables: { entryId } })
                .then(({ data }) => {   

                    const isDataArray = data && Array.isArray(data.entries) 

                    setEntry( isDataArray ? data.entries[0] : null) 

                })
                .catch(error => { throw new Error(error) })

            return () => {
                axiosCancel()
            } 
        }

    }, [entryId, isState])

    const handleModalClic = () => {
        setIsEditModal(!isEditModal)
    }

    if (!entry) { return <h5>Could not fetch entry</h5> } 
    const date = new Date(entry.createdAt)   

    return (
        <div className={theme.page_container}>

            
            
            {isEditModal && (
                <EditEntry onClick={handleModalClic} state={entry} theme={theme}/>
            )}

            <div className={theme.view_entry}>
                <div 
                    style={{ 
                        display: 'flex', 
                        padding: '0.5rem 0.5rem 0rem', 
                        justifyContent: 'end' 
                    }}>
                    <Button onClick={handleModalClic} >
                        <EditSvg fill='#fff' width='25' height='25' />
                    </Button>
                </div>
                <div className={theme.space_between__container}>
                    <p>
                        <time>{date.toDateString()}</time>
                    </p>
                    <p>    
                        <time>{date.toLocaleTimeString(_language, timeFormat)}</time>
                    </p>
                </div>
                
                <h1 style={{ textAlign: 'center' }}>{entry.title}</h1>
                <p style={{ marginBottom: '3rem'}}>{entry.text}</p>
            </div>

        </div>
    )
}



export default ViewEntry