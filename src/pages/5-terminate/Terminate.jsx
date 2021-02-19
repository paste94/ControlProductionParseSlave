import React, { useEffect, useState } from 'react';
import TerminateTable from './TerminateTable'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useLocation, useHistory } from 'react-router'
import { FaArrowLeft } from "react-icons/fa"
import { closeJobs, getLavori } from '../../DAO/Lavori.service';
import { Alert, AlertContainer } from 'react-bs-notifier'

function Terminate(props){
    const [data, setData] = useState([])
    const [selected, setSelected] = useState([])
    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)

    const history = useHistory()
    const impiegato = useLocation().state.impiegato
    const returnToMain = () => history.go(0)

    const handleSelect = (lavoro, isSelect) => {
        if(isSelect)
            setSelected([...selected, lavoro])
        else
            setSelected(selected.filter( item => item.id !== lavoro.id ))
    }
    const handleGoBack = () => history.goBack()
    const handleConfirm = () => {
        closeJobs(selected, returnToMain, handleShowError)
    }
    const handleDismissError = () => setErrShow(false)
    const handleShowError = (err) => {
        setErrMessage(err.message)
        setErrTitle(err.title)
        setErrShow(true)
    }

    useEffect(() => {
        getLavori(impiegato.id, data => setData(data), handleShowError)
    }, [])

    return (
        <div>
            <AlertContainer
				position='top-right' >
                    { errShow ? (
                        <Alert 
                            type='danger' 
                            headline={ errTitle }
                            onDismiss={ handleDismissError } >
                            {errMessage}
                        </Alert>
                    ) : null }
            </AlertContainer>
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
                        <h1>Selezionare i lavori da terminare</h1>
                    </Col>
                    <Col md="3" sm="3" xs="3" className='my-auto'> 
                        <Button 
                            onClick={ handleConfirm }
                            disabled={ selected.length === 0 }
                            title='Avanti' >
                                Termina selezionati
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col> 
                    < TerminateTable
                        data={ data } 
                        handleSelect={ handleSelect }/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Terminate
