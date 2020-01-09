import React, { useState } from "react"
import Loading from '../common/loading'
import { Button } from '../../layouts/buttons/buttons'



const containerStyle = { width: '50rem', margin: '0 auto' }



const AboutContent = props => (
    <section style={containerStyle}>
        <header>
            <h2 style={{ textAlign: 'center' }}>About simple-journal</h2>
        </header>
        <div>
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
            <header style={containerStyle}>
                <Button type='button' onClick={onHandleClick}>
                    {buttonName[+showLoading]}
                </Button>
            </header>            
            {showLoading ? <Loading /> : <AboutContent />}            
        </main>
    )
}


export default AboutPage