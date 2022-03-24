import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormCheck, FormControl, InputGroup, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import BtnConfirm from './BtnConfirm';
import { FaArrowLeft } from 'react-icons/fa'
import packageJson from '../../../package.json';

/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Impostazioni() {
    const [serverUrl, setServerUrl] = useState('')

    const handleResetDefaultSettings = () => {
        localStorage.setItem('ServerUrl', 'http://localhost:1337')
        setServerUrl(localStorage.getItem('ServerUrl'))
    }

    const handleSaveSettings = () => {
        console.log('SAVE', serverUrl)
        localStorage.setItem('ServerUrl', serverUrl)
    }

    useEffect(() => {
        const _url = localStorage.getItem('ServerUrl')
        setServerUrl(_url)
    }, [])

    // TODO: Salva server url
    // TODO: Chiedi conferma con modal avvisando che è pericoloso modificare questa impostazione!
    return (
        <div 
            id="page-content-wrapper" 
            className='container-fluid mt-4 margin margin-30' >
            <Row>
                <Col lg='1' md='1' sm='1'>
                    <NavLink to='/selectImpiegato' key={0} activeClassName="active">
                        <Button
                            variant='transparent'
                            title='Indietro' >
                            <FaArrowLeft/>
                        </Button>
                    </NavLink>
                </Col>
            </Row>
            <Row className='align-items-center'>
                <Col>
                    <h1>Impostazioni</h1>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg='4' md='4' sm='4'>
                    <Form.Label>Server URL</Form.Label>
                </Col>
                <Col>
                    <InputGroup>
                    <FormControl
                        onChange={ (e) => setServerUrl(e.target.value)}
                        value={serverUrl} />
                    </InputGroup>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <h3>Credits</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Control Production Master (v{packageJson.version})</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Creato da Riccardo Pasteris (<a href='mailto:riccardopasteris@gmail.com'>riccardopasteris@gmail.com</a>)</p>
                </Col>
            </Row>
            <Row
                style={{
                    position: 'absolute',
                    right: 30,
                    bottom: 20,
                }}>
                <Col>
                    <BtnConfirm
                        handleConfirm={handleSaveSettings}
                        title={'Salvare le nuove impostzioni?'} >
                        Salva
                    </BtnConfirm>
                </Col>
                <Col>
                    <BtnConfirm
                        handleConfirm={handleResetDefaultSettings}
                        title={'Resettare le impostazioni di default?'}>
                            Reset
                    </BtnConfirm>
                </Col>
            </Row>
        </div>
    )
}

export default Impostazioni;
