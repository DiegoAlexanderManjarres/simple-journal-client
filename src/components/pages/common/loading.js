import React, { useContext } from "react"
import { ThemeContext } from '../../../context/contexts'
import loadingThemes from '../../../styles/loading/loadingTheme'



const LoadingPage = props => {
    const { name } = useContext(ThemeContext)
    const theme = loadingThemes[name]
    return (
        <section>
            
            <header>
                <div className={theme.circle}></div>
                <h1 className={theme.change}>LOADING</h1>
            </header> 
            
            <div id={theme.content}>
                <span className={theme.expand}></span>
            </div>      
            
        </section>
    )
}


// Loading animation component that cover the full view port
export const LoadingFull = props => {
    const { name } = useContext(ThemeContext)
    
    return (
        <div className={loadingThemes[name].loading_full}>
            <LoadingPage />
        </div>
    )
}



export default LoadingPage