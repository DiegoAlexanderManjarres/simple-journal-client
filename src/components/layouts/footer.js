import React from 'react'



const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'inherit' }}>
            <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                {'Icons made by '} 
                <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">
                    iconixar
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
                    Eucalyp
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">
                    Kiranshastry
                </a>   
                {', '}                
                <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">
                    DinosoftLabs
                </a> 
                    {' from '} 
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>                                 
            </div>            
        </footer>
    )
}


export default Footer