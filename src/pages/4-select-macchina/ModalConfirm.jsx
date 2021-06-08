import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { addLavoro } from '../../DAO/Lavori.service';
import { Alert, AlertContainer } from 'react-bs-notifier';
import { NavLink } from 'react-router-dom';

function ModalConfirm(props){
    const [btnGoBack, setBtnGoBack] = useState(null)
    const [show, setShow] = useState(false)
    const [errTitle, setErrTitle] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [errShow, setErrShow] = useState(false)
    const [startTime] = useState(new Date())

    const goBack = () => btnGoBack.click()
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleConfirm = () => {
        addLavoro(
            props.macchina, 
            props.impiegato, 
            props.commessa, 
            props.preventivo, 
            startTime,
            goBack, 
            handleShowError)
    }
    //const returnToMain = () => history.go(0)
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
                    {/*     Questo è un bottone nascosto che viene clickato programmaticamente 
                            quando deve tornare indietro (non uso la history perchè in produzione non funziona!)
                    */}
                    <NavLink to='/selectImpiegato' key={0} activeClassName="active">
                        <Button 
                            ref={ref => { setBtnGoBack(ref) }}
                            hidden>
                        </Button>
                    </NavLink>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalConfirm
