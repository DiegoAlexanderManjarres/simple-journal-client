import React from 'react'



const IconsCreditLinks = () => (
    <div 
        style={{ 
            fontSize: '0.8rem', 
            textAlign: 'center', 
            height: 'auto'
            // margin: '1rem 0rem 0.5rem',
            }}
        >{'Icons made by '} 
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
        {', and '}                
        <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">
            DinosoftLabs
        </a> 
            {' from '} 
        <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
        </a>                                 
    </div> 
)



const Footer = () => {
    return (
        <footer>
            <div style={{
                paddingTop: '1rem',
                maxWidth: '50rem',
                width: '100%',
                margin: '0 auto', 
                height: '100%'                               
            }}>
                <p style={{ textAlign: 'center' }}>&copy; Diego Manjarres</p>
                <IconsCreditLinks />
            </div>           
        </footer>
    )
}


export default Footer