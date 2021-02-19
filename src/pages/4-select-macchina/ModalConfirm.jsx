import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { addLavoro } from '../../DAO/Lavori.service';
import { useHistory } from 'react-router';
import { Alert, AlertContainer } from 'react-bs-notifier';

function ModalConfirm(props){
    const [show, setShow] = useState(false)
    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)
    const [startTime] = useState(new Date())

    const history = useHistory()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleConfirm = () => {
        addLavoro(
            props.macchina, 
            props.impiegato, 
            props.commessa, 
            props.preventivo, 
            startTime,
            returnToMain, 
            handleShowError)
    }
    const returnToMain = () => history.go(0)
    const handleDismissError = () => setErrShow(false)
    const handleShowError = (err) => {
        setErrMessage(err.message)
        setErrTitle(err.title)
        setErrShow(true)
    }

    return (
        <div>
            <Button 
                onClick={ handleShow }
                title='Termina' 
                disabled={ props.disabled } >
                    Seleziona
            </Button>

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

            <Modal show={show} onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confermare le seguenti informazioni?
                    <ul>
                        <li>
                            Impiegato: {props.impiegato.nome}
                        </li>
                        <li>
                            Commessa: {props.commessa.numero}
                        </li>
                        <li>
                            Disegno: {props.preventivo.numDisegno}
                        </li>
                        <li>
                            Macchina: {props.macchina !== undefined ? props.macchina.nome : ''}
                        </li>
                        <li>
                            Ora inizio: {startTime.toLocaleTimeString()}
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={ handleConfirm }>
                        Conferma
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalConfirm
