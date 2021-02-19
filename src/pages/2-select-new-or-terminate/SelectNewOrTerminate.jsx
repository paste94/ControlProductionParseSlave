import React from 'react';
import { useLocation } from 'react-router';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router'
import { FaArrowLeft } from "react-icons/fa"

function SelectNewOrTerminate(){
    const impiegato = useLocation().state.impiegato
    const history = useHistory()
    const handleGoBack = () => history.goBack()

    const handleGoToNewLavoro = () => {
        history.push({
            pathname: '/selectNewJob',
            state:{impiegato: impiegato}
        })
    }

    const handleGoToTerminate = () => {
        history.push({
            pathname: '/terminate',
            state:{impiegato: impiegato}
        })
    }

    return (
        <div>
            <Container fluid className='mt-4'>
                <Row className="justify-content-center mt-4">
                    <Col md="1" sm="1" xs="1" className='my-auto'> 
                        <Button 
                            variant='light' 
                            onClick={ handleGoBack }
                            title='Indietro' >
                                <FaArrowLeft/>
                        </Button>
                    </Col>
                    <Col className='my-auto'> 
                        <h1>Selezionare l'azione da eseguire</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md="auto" sm="auto" xs="auto" className='my-auto'> 
                        <Button onClick={ handleGoToNewLavoro }>Nuovo lavoro</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md="auto" sm="auto" xs="auto" className='my-auto'> 
                        <Button onClick={ handleGoToTerminate }>Termina lavoro</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SelectNewOrTerminate
