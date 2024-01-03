import React, { useState } from 'react';
import { Row, Col, Container, FormControl, Spinner, Button } from 'react-bootstrap';
import { Alert, AlertContainer } from 'react-bs-notifier';
import { useHistory } from 'react-router';
import { getImpiegatoFromChip } from '../../DAO/Impiegati.service';
import { FaCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';


function SelectImpiegato(){
    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)
    const [waitForResponse, setWaitForResponse] = useState(false)
    const history = useHistory()

    const handleChipSelection = (event) => {
        if (event.charCode === 13) {
            setWaitForResponse(true)
            getImpiegatoFromChip(event.target.value, handleSetData, handleShowError)
            event.target.value = ''
        }
    }

    const resetFormControl = () => setWaitForResponse(false)
    const handleDismissError = () => setErrShow(false)
    const handleShowError = (err) => {
        setErrMessage(err.message)
        setErrTitle(err.title)
        setErrShow(true)
        resetFormControl()
    }
    const handleSetData = (impiegato) => {
        resetFormControl()
        if(impiegato.lavoriInCorso === undefined || impiegato.lavoriInCorso.length === 0){
            history.push({
                pathname: '/selectNewJob',
                state:{impiegato: impiegato}
            })
        }else{
            history.push({
                pathname: '/selectNewOrTerminate',
                state:{impiegato: impiegato}
            })
        }
    } 

    return (
        <div>
            <AlertContainer
				position='top-right' >
                    { errShow ? (
                        <Alert 
                            type='danger' 
                            headline={ errTitle }
                            onDismiss={handleDismissError} >
                            {errMessage}
                        </Alert>
                    ) : null }
            </AlertContainer>
            <Container fluid className='mt-4'>
                <Row className="justify-content-center">
                    <Col md="auto" sm="auto" xs="auto" className='my-auto'> 
                        <h1>Scorrere il TAG per cominciare</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col md="auto" sm="auto" xs="auto" className='my-auto'> 
                        <FormControl
                            autoFocus
                            disabled={waitForResponse}
                            placeholder="Chip"
                            aria-label="Chip"
                            aria-describedby="basic-addon1"
                            onKeyPress={handleChipSelection}
                        />            
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col md="auto" sm="auto" xs="auto" className='my-auto'> 
                        { waitForResponse ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : null}
                    </Col>
                </Row>
            </Container>
            <NavLink 
                to={"/impostazioni"} 
                key={0} 
                activeClassName="active" >
                <Button
                    variant='link'
                    title="impostazioni"
                    style={{
                        position: 'absolute',
                        left: 20,
                        bottom: 20,
                    }} > 
                        <FaCog style={{ color: 'grey' }}/>
                </Button>
            </NavLink>
        </div>
    )
}

export default SelectImpiegato

