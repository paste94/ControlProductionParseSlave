import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router';
import { getAllMacchine } from '../../DAO/Macchine.service';
import { FaArrowLeft } from "react-icons/fa";
import MacchineTable from './MacchineTable';
import ModalConfirm from './ModalConfirm';

function SelectMacchina(){
    const impiegato = useLocation().state.impiegato
    const commessa = useLocation().state.commessa
    const preventivo = useLocation().state.preventivo
    const history = useHistory()

    const [macchine, setMacchine] = useState([])
    const [macchina, setMacchina] = useState(undefined)

    const handleGoBack = () => history.goBack()
    const handleSelect = (macc) => setMacchina(macc)

    useEffect(() => {
        getAllMacchine( macc => setMacchine(macc) )
    }, [])

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
                        <h1>Selezionare la macchina da usare</h1>
                    </Col>
                    <Col md="2" sm="2" xs="2" className='my-auto'> 
                        {console.log(impiegato, commessa, preventivo, macchina)}
                        <ModalConfirm 
                            impiegato={impiegato} 
                            commessa={commessa} 
                            preventivo={preventivo} 
                            macchina={macchina} 
                            disabled={macchina===undefined} />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col> 
                        <MacchineTable
                            data={ macchine }
                            handleSelect={ handleSelect } />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SelectMacchina
