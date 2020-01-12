import React, { useState, useEffect, useContext } from "react"
import { Link } from '@reach/router'
import axiosClient, { axiosCancel } from '../../../utils/axiosConfig'
import { 
    ThemeContext, 
    GlobalEntriesContext,
    GlobalEntriesDispatch
} from '../../../context/contexts'
import { GET_MY_ENTRIES__QUERY } from '../../../graphql/queries'
import { Button } from '../../layouts/buttons/buttons'
import AddEntry from '../private/addEntry'
import containerThemes from '../../../styles/containers/containerThemes'
import AddSVG from '../../../../static/assets/icons/add.svg'
import Loading from '../common/loading'




const EntryCart = ({ entry }) => {    
    const _language = navigator.language
    const timeFormat = { hour: '2-digit', minute:'2-digit' }
    const date = new Date(entry.createdAt)
    return (
        <li data_id={entry.id}>
            <Link to={`/app/viewEntry/${entry.id}`} state={entry} >
                <h4>{entry.title}</h4>
                <p>{entry.text}</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <time>{date.toDateString()}</time>                    
                    <time>{date.toLocaleTimeString(_language, timeFormat)}</time>
                </div>
            </Link>
        </li>
    )
}



const Entries = ({ entries, ...props }) => {

    const state = useContext(ThemeContext)/* 
    const [theme, setTheme] = useState(containerThemes[state.name])
    
    useEffect(() => {
        setTheme(containerThemes[state.name])
    }, [state.name])
  */
    const theme = containerThemes[state.name]
    
    const MyEntries = entries
        .map(entry => <EntryCart key={entry.id} entry={entry} />)

    if (entries.length < 1) { 
        return <h3 style={{ textAlign: 'center' }}>Add and entry</h3> 
    }    

    return (
        <ul className={theme.entries_container}>
            {MyEntries}
        </ul>
    )
}



const Dashboard = props => {
    const { state } = props.location
    const message = (state && state.message) ? state.message : null

    const entries = useContext(GlobalEntriesContext)
    const dispatchEntries = useContext(GlobalEntriesDispatch)
    const { name } = useContext(ThemeContext)

    const [theme] = useState(containerThemes[name])
    const [isAddEntryModal, setIsAddEntryModal] = useState(false)
    const [loading, setLoading] = useState(false)
    
    /* 
        TODO
        - Figure out how to handle, when there is a reload, the 
          props.location.state.message that persist on cash is 
          displyed
    */

    // effect that fetches entries from db
    useEffect(() => {
        if (entries.length < 1) {
            setLoading(true)
            axiosClient(GET_MY_ENTRIES__QUERY)
                .then(({ data }) => {      
                    const isDataArray = data && Array.isArray(data.entries)  
                    dispatchEntries({ 
                        type: 'SET_ENTRIES',
                        payload: isDataArray ? data.entries : []
                    })  
                    setLoading(false)              
                })
                .catch(error => {
                    setLoading(false)
                    console.log(error)
                })

            return () => {
                axiosCancel()
            }    
        }
    }, [dispatchEntries, entries.length])

    const modalHandleClick = () => { setIsAddEntryModal(!isAddEntryModal) }
    
    return (
        <div className={theme.page_container}>            
            
            <div 
                style={{ 
                    display: 'flex', 
                    padding: '0.5rem 0.5rem 0rem',
                    justifyContent: 'center',
                    height: '3rem',
                    }
                }>
                <Button 
                    type='button' 
                    onClick={modalHandleClick} 
                    style={{ 
                        padding: '0', 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        paddingTop: '0.1rem', 
                        }
                    }>
                    <AddSVG fill='#fff' width='80%' height='auto' />
                </Button>
            </div>            

            <div>
                {!!message && <h5>{message}</h5>}
            </div>

            {isAddEntryModal && (
                <AddEntry 
                    modalHandleClick={modalHandleClick} 
                    dispatchEntries={dispatchEntries}
                    theme={theme} />
            )}

            {loading ? <Loading /> : <Entries entries={entries} /> }      

        </div>
    )
}



export default Dashboard