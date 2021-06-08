import React from 'react';
import { useLocation } from 'react-router';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router'
import { FaTimes } from "react-icons/fa"
import { NavLink } from 'react-router-dom';

function SelectNewOrTerminate(){
    const impiegato = useLocation().state.impiegato
    const history = useHistory()

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
                        <NavLink to='/selectImpiegato' key={0} activeClassName="active">
                            <Button
                                variant='transparent'
                                title='Annulla operazione' >
                                <FaTimes/>
                            </Button>
                        </NavLink>
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
