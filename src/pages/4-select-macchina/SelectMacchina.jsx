import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { getAllMacchine } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import ModalConfirm from './ModalConfirm';
import { FaTimes } from "react-icons/fa"
import { NavLink } from 'react-router-dom';

function SelectMacchina(){
    const impiegato = useLocation().state.impiegato
    const commessa = useLocation().state.commessa
    const preventivo = useLocation().state.preventivo

    const [macchine, setMacchine] = useState([])
    const [macchina, setMacchina] = useState(undefined)

    const handleSelect = (macc) => setMacchina(macc)

    useEffect(() => {
        getAllMacchine( macc => setMacchine(macc) )
    }, [])

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
                        <h1>Selezionare la macchina da usare</h1>
                    </Col>
                    <Col md="2" sm="2" xs="2" className='my-auto'> 
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
