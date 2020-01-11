import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from '../../../context/contexts'
import loadingThemes from '../../../styles/loading/loadingTheme'



const LoadingPage = ({ _className, ...rest }) => {
    const { name } = useContext(ThemeContext)
    const [theme, setTheme] = useState(loadingThemes[name])

    useEffect(() => {
        console.log('theme name:', name)
        setTheme(loadingThemes[name])
    }, [name])
    
    return (
        <section className={_className ? theme[_className] : null}>
            
            <header>
                <div className={theme.circle}></div>
                <h1 className={theme.change}>LOADING</h1>
            </header> 
            
            <div id={theme.content}>
                <span className={theme.expand} />
            </div>      
            
        </section>
    )
}


// Loading animation component that cover the full view port
export const LoadingFull = props => <LoadingPage _className={'loading_full'}/>



export default LoadingPage