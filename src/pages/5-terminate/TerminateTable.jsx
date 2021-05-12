import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function TerminateTable(props){
    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID'
    },{
        dataField: 'commessaNome',
        text: 'Numero commessa'
    },{
        dataField: 'preventivoNome',
        text: 'Numero Disegno'
    },{
        dataField: 'macchina',
        text: 'Macchina'
    },{
        dataField: 'inizio',
        text: 'Data inizio',
        formatter: (cell) => {
            const dd = cell.getDate() < 10 ? '0'+cell.getDate() : cell.getDate()
            const mm = cell.getMonth()+1 < 10 ? '0'+(cell.getMonth()+1) : cell.getMonth()+1
            const yy = cell.getFullYear()
            const hh = cell.getHours() < 10 ? '0'+cell.getHours() : cell.getHours()
            const min = cell.getMinutes() < 10 ? '0'+cell.getMinutes() : cell.getMinutes()
            return dd + '/' + mm + '/' + yy + ' - ' + hh + ':' + min
        }
    }];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => props.handleSelect(row, isSelect)
    }

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

export default TerminateTable
