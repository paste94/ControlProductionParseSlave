import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function PreventiviTable(props){
    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true
    },{
        dataField: 'numDisegno',
        text: 'Numero Disegno'
    }];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            props.handleSelect(row)
        }
    };

    return (
        <BootstrapTable 
            keyField='id' 
            data={ props.data } 
            columns={ columns } 
            pagination={ paginationFactory() }
            noDataIndication="Tabella vuota"
            selectRow={ selectRow } />
    )
}

export default PreventiviTable
