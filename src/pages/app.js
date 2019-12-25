import React from 'react'
import { Router } from '@reach/router'
import Dashboard from '../components/pages/private/dashboard'
import ViewEntry from '../components/pages/private/viewEntry'
import LoginPage from '../components/pages/public/login/login'
import RegisterPage from '../components/pages/public/register/register'
import AboutPage from '../components/pages/common/about'
import PrivateRoute from '../components/router/PrevateRoute'
import PublicRoute from '../components/router/PublicRoute'


const App = () => (        
    <Router>
        <PrivateRoute path='/app/dashboard' component={Dashboard} />
        <PrivateRoute path='/app/viewEntry/:entryId' component={ViewEntry} />
        <PublicRoute path='/app/login' component={LoginPage} />
        <PublicRoute path='/app/register' component={RegisterPage} /> 
        <AboutPage path='/app/about' />
    </Router>        
)



export default App