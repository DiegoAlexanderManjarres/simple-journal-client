import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from '../../../context/contexts'
import loadingThemes from '../../../styles/loading/loadingTheme'



const LoadingPage = ({ _className, ...rest }) => {
    const { name } = useContext(ThemeContext)
    const [theme, setTheme] = useState(loadingThemes[name])
    const [class_name, setClass_name] = useState(null)

    useEffect(() => {
        setTheme(loadingThemes[name])
        if (_className) { setClass_name(loadingThemes[name][_className]) }
    }, [_className, name])
    
    // console.log(name, ': ', _classname)

    /* TODO
        on production netlify for some reason the theme that shows on client side
        is allways DEFAULT even when console log shows its DARK

        Using style did not fixed it    

        localstorage its being read at context correctly, 
        but the html return it has the 'DEFAULT' theme
    */

    return (
        <section className={class_name}>            
            <header>
                <div className={theme.circle}></div>
                <h2 className={theme.change}>LOADING...</h2>
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