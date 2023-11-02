import React, { useEffect, useState } from 'react';
import TerminateTable from './TerminateTable'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { closeJobs, getLavori } from '../../DAO/Lavori.service';
import { Alert, AlertContainer } from 'react-bs-notifier'
import { FaTimes } from "react-icons/fa"
import { NavLink } from 'react-router-dom';

function Terminate(props){
    const [btnGoBack, setBtnGoBack] = useState(null)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState([])
    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)

    const impiegato = useLocation().state.impiegato

    const handleSelect = (lavoro, isSelect) => {
        if(isSelect)
            setSelected([...selected, lavoro])
        else
            setSelected(selected.filter( item => item.id !== lavoro.id ))
    }
    const handleConfirm = () => closeJobs(selected, goBack, handleShowError)
    const goBack = () => btnGoBack.click()
    const handleDismissError = () => setErrShow(false)
    const handleShowError = (err) => {
        setErrMessage(err.message)
        setErrTitle(err.title)
        setErrShow(true)
    }

    useEffect(() => {
        getLavori(impiegato.id, data => setData(data), handleShowError)
    }, [impiegato])

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
                        <NavLink to='/selectImpiegato' key={0} activeClassName="active">
                            <Button
                                variant='transparent'
                                title='Annulla operazione' >
                                <FaTimes/>
                            </Button>
                        </NavLink>
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
                        {
                            /*  Questo è un bottone nascosto che viene clickato programmaticamente 
                                quando deve tornare indietro (non uso la history perchè in produzione non funziona!)
                            */
                        }
                        <NavLink to='/selectImpiegato' key={0} activeClassName="active">
                            <Button 
                                ref={ref => { setBtnGoBack(ref) }}
                                hidden>
                            </Button>
                        </NavLink>
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
