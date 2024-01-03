import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function CommesseTable(props){
    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true
    },{
        dataField: 'numero',
        text: 'Numero Commessa'
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
            keyField='id' 
            data={ props.data } 
            columns={ columns } 
            pagination={ paginationFactory() }
            noDataIndication="Non sono presenti Commesse"
            selectRow={ selectRow } />
    )
}

export default CommesseTable
