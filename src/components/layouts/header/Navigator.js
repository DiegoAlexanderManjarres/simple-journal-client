import React, { useContext, useState } from 'react'
import { navigate } from 'gatsby'
import { Link, Location } from '@reach/router'
import axiosClient from '../../../utils/axiosConfig'
import { LOGOUT_QUERY } from '../../../graphql/mutations'
import { 
    GlobalStateContext, 
    GlobalDispatchContext, 
    ThemeContext,
    ThemeDispatchContext
} from '../../../context/contexts'
import navTheme from '../../../styles/navigator/navigatorTheme'
import { LoadingFull } from '../../pages/common/loading'



// component button that toggles theme selection
const ThemeSelector = () => {
    const { name } = useContext(ThemeContext)
    const dispatch = useContext(ThemeDispatchContext)

    const handleClick = e => {
        let themeName = name
        themeName = themeName === 'DARK' 
            ? 'DEFAULT'
            : themeName === 'DEFAULT'
                ? 'DARK'
                : 'DEFAULT'

        dispatch({ type: 'SET_THEME_NAME', payload: { name: themeName }})
        localStorage.setItem('theme_name', JSON.stringify({ name: themeName }))        
    }

    return (
        <div style={{
            border: `1px solid ${name === 'DARK' ? '#585858' : '#eaeaea'}`,
            padding: '2px',
            borderRadius: '50%',
            maxHeight: '2.4rem',
            maxWidth: '2.4rem'
        }}>
            <input 
                type='image' 
                onClick={handleClick} 
                alt='change theme'
                src='/assets/icons/day.png' 
                data_value='DEFAULT'
                style={{
                    maxHeight: '2rem',
                    maxWidth: '2rem',
                    outline: 'none'
                }}/>
        </div>        
    )
}


// navigator bar links
const NavLinks = ({ state, onClick, location, ...rest }) => {
    const { name } = useContext(ThemeContext)

    const style =  pathName => {
        const _style = { color: '#c64772', fontWeight: 'bolder' }
        return location.pathname === pathName ? _style : null    
    }

    return (
        <nav className={navTheme[name].navigator} { ...rest }> 
            <div>
                <div>        
                    {state.isLoggedIn 
                        ?   <Link 
                                to='/app/dashboard'
                                style={style('/app/dashboard')}
                                >Dashboard
                            </Link> 
                        :   <Link 
                                to='/app/login'
                                style={style('/app/login')}
                                >Login
                            </Link> 
                    }
                </div>            
                <div> 
                    <Link 
                        to='/app/about'
                        style={style('/app/about')}
                        >About
                    </Link> 
                </div>
                    {state.isLoggedIn && (
                        <div>
                            <button onClick={onClick}>Logout</button>
                        </div>
                    )}            
                <ThemeSelector />  
            </div>                         
        </nav>

    )
}



// Using Location component from @react-router to get current location
const Navigator = props => {    
    const state = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)
    const [loading, setLoading] = useState(false)

    const handleClick = e => {
        setLoading(true)
        axiosClient(LOGOUT_QUERY)
            .then(response => {
                dispatch({ 
                    type: 'TOGGLE_LOGGIN_STATUS',
                    payload: { ...state, isLoggedIn: false }
                })
                setLoading(false)
                navigate('/')
                return null
            })
            .catch(error => { 
                setLoading(false)
                throw new Error(error) 
            })
    }

    if (loading) { return <LoadingFull /> }

    return (
        <Location>
            {({ location }) => (                
                <NavLinks state={state} onClick={handleClick} location={location} />
            )}
        </Location>
        
    )
}



export default Navigator