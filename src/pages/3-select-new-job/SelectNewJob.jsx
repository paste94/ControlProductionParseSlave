import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { getAllCommesse } from '../../DAO/Commesse.service'
import { selectPreventiviFromCommessa } from '../../DAO/Preventivo.service'
import CommesseTable from './CommesseTable'
import PreventiviTable from './PreventiviTable'
import { FaArrowLeft, FaCross, FaTimes } from "react-icons/fa"
import { Alert, AlertContainer } from 'react-bs-notifier'
import { NavLink } from 'react-router-dom';

function SelectNewJob(){
    const impiegato = useLocation().state.impiegato

    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)
    const [commesse, setCommesse] = useState([])
    const [preventivi, setPreventivi] = useState([])
    const [commessa, setCommessa] = useState({})
    const [preventivo, setPreventivo] = useState(undefined)
    const [firstRender, setFirstRender] = useState(true)
    const history = useHistory()

    const handleSelectCommessa = (comm) => {
        setPreventivo(undefined)
        setCommessa(comm)
    }
    const handleSelectPreventivo = (prev) => setPreventivo(prev)
    const handleConfirm = () => 
        history.push({
            pathname: '/selectMacchina',
            state:{
                impiegato: impiegato,
                commessa: commessa,
                preventivo: preventivo
            }
        })

    const handleDismissError = () => setErrShow(false)
    const handleShowError = (err) => {
        setErrMessage(err.message)
        setErrTitle(err.title)
        setErrShow(true)
        setPreventivi([])
    }

    useEffect(() => {
        if(firstRender){ 
            getAllCommesse( id => setCommesse(id) ) 
            setFirstRender(false)
        }else{
            selectPreventiviFromCommessa( commessa.id, prev => setPreventivi(prev), handleShowError )
        }
    }, [commessa])

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
                        <h1>Selezionare il nuovo lavoro da iniziare</h1>
                    </Col>
                    <Col md="2" sm="2" xs="2" className='my-auto'> 
                        <Button 
                            onClick={ handleConfirm }
                            disabled={ preventivo===undefined }
                            title='Avanti' >
                                Seleziona
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col> 
                        <CommesseTable 
                            data={ commesse }
                            handleSelect={ handleSelectCommessa } />
                    </Col>
                    <Col> 
                        < PreventiviTable
                            data={ preventivi } 
                            handleSelect={ handleSelectPreventivo }/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SelectNewJob
