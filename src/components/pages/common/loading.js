import React, { useContext } from "react"
import { ThemeContext } from '../../../context/contexts'
import loadingThemes from '../../../styles/loading/loadingTheme'



const LoadingPage = ({ _className, ...rest }) => {
    const { name } = useContext(ThemeContext)
    const theme = loadingThemes[name]
    const _classname = _className ? theme[_className] : null
    const style_background = { 
        backgroundColor: name === 'DARK' ? '#383838' : 'white'
    }
    // console.log(name, ': ', _classname)

    /* TODO
        on production netlify for some reason the theme that shows on client side
        is allways DEFAULT even when console log shows its DARK

        to fix it I am usint style to pic the right backgorund color
    */

    return (
        <section className={_classname} style={style_background}>            
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