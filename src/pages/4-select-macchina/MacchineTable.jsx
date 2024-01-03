import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function MacchineTable(props){
    // Definizione delle colonne
    const columns = [{
        dataField: 'nome',
        text: 'Macchina'
    }];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            props.handleSelect(row)
        }
    }

    return (
        <BootstrapTable 
            keyField='nome' 
            data={ props.data } 
            columns={ columns } 
            pagination={ paginationFactory() }
            noDataIndication="Non sono presenti Macchine"
            selectRow={ selectRow } />
    )
}

export default MacchineTable
