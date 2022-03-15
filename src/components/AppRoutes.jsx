import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SelectImpiegato from '../pages/1-select-impiegato/SelectImpiegato';
import SelectNewOrTerminate from '../pages/2-select-new-or-terminate/SelectNewOrTerminate';
import SelectNewJob from '../pages/3-select-new-job/SelectNewJob';
import SelectMacchina from '../pages/4-select-macchina/SelectMacchina';
import Terminate from '../pages/5-terminate/Terminate';
import Impostazioni from '../pages/settings/Impostazioni';

function AppRoutes(){
    const firstPage = '/selectImpiegato'
    const routes = [
        {
            key: 0,
            path: '/selectImpiegato',
            main: () => {
                return(
                    <SelectImpiegato/>
                )
            }
        },{
            key: 1,
            path: '/selectNewOrTerminate',
            main: () => {
                return(
                    <SelectNewOrTerminate/>
                )
            }
        },{
            key: 2,
            path: '/selectNewJob',
            main: () => {
                return(
                    <SelectNewJob />
                )
            }
        },{
            key: 3,
            path: '/selectMacchina',
            main: () => {
                return(
                    <SelectMacchina />
                )
            }
        },{
            key: 4,
            path: '/terminate',
            main: () => {
                return(
                    <Terminate />
                )
            }
        },{
            key: 5,
            path: '/impostazioni',
            main: () => {
                return(
                    <Impostazioni />
                )
            }
        }
    ]

    return (
        <Router>
            <Redirect from='/' to={firstPage} />
            {
                routes.map( elem => (
                    <Route 
                        key={elem.key}
                        path={elem.path}
                        component={elem.main} />
                ))
            }
        </Router>
    )
}

export default AppRoutes
