import React from "react"
import '../../../styles/loading/base.scss'


const LoadingPage = () => (
  <section>
      
    <header>
    <div className='circle'></div>
        <h1 className='change' style={{ textAlign: 'center' }}>LOADING</h1>
    </header> 
    <div id='content'>
        <span className='expand'></span>
    </div>
      
      
  </section>
)


export default LoadingPage