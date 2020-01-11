import React, { useContext } from "react"
import { ThemeContext } from '../../../context/contexts'
import loadingThemes from '../../../styles/loading/loadingTheme'



const LoadingPage = ({ _className, ...rest }) => {
    const { name } = useContext(ThemeContext)
    const theme = loadingThemes[name]
    const _classname = _className ? theme[_className] : null
    console.log(name, ': ', _classname)

    return (
        <div className={_classname}>            
            <header>
                <div className={theme.circle}></div>
                <h1 className={theme.change}>LOADING</h1>
            </header> 
            
            <div id={theme.content}>
                <span className={theme.expand} />
            </div>      
            
        </div>
    )
}


// Loading animation component that cover the full view port
export const LoadingFull = props => <LoadingPage _className={'loading_full'}/>



export default LoadingPage