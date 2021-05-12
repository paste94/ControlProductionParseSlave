import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoSettingsSharp } from "react-icons/io5";
import editJsonFile from "edit-json-file";

function ModalSettings(props){
    const [show, setShow] = useState(false)
    const [url, setUrl] = useState(serverUrl.get('URL'))
    const [password, setPassword] = useState('')

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleChangeUrl = (e) => setUrl(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        if(password === serverUrl.PWD){

            alert('Tutto fatto, riavviare il programma prima di proseguire')
        }else{
            e.preventDefault()
            props.handleError( {
                title:'Password errata',
                message:'Riprovare'
            } )
        }
    }

    return (
        <div>
            <Button 
                variant='light' 
                text='Impostazioni'
                className='mt-1 ml-4' 
                style={{position:'fixed'}} 
                onClick={ handleShow } >
                <IoSettingsSharp />
            </Button>
            <Modal show={show} onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Impostazioni</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id='changeIp' onSubmit={ handleSubmit }>
                        <Form.Group>
                            <Form.Label>Indirizzo IP</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={url}
                                onChange={ handleChangeUrl } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={ password }
                                onChange={ handleChangePassword } />
                            <Form.Control.Feedback type="invalid">
                                Password errata
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary" form='changeIp' type='submit'>Salva</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalSettings
