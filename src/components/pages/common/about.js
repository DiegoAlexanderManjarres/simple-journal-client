import React, { useState } from "react"
import Loading from '../common/loading'
import { ButtonExtend } from '../../layouts/buttons/buttons'



const containerStyle = { maxWidth: '50rem', margin: '0 auto' }



const AboutContent = props => (
    <section style={containerStyle}>
        <header>
            <h2 style={{ textAlign: 'center', margin: '4rem 0rem 3rem 0rem' }}>
                About simple-journal
            </h2>
        </header>
        <div style={{ margin: '0.5rem' }}>
            <p>
                Simple journal is a demo app for education purposes, that is built using Gatsby
                for the front-end, and it uses Graphql-yoga with Prisma for the backend.
            </p>
        </div>
    </section>
)


const AboutPage = props => {
    const [showLoading, setShowLoading] = useState(false)
    const buttonName = ['Show loading screen', 'Show about content']

    const onHandleClick = e => {
        setShowLoading(!showLoading)
    }

    return (
        <main>
            <header style={{...containerStyle, padding: ' 0rem 0.5rem 0rem' }}>
                <ButtonExtend type='button' onClick={onHandleClick}>
                    {buttonName[+showLoading]}
                </ButtonExtend>
            </header>            
            {showLoading ? <Loading /> : <AboutContent />}            
        </main>
    )
}


export default AboutPage