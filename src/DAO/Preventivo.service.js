import {preventivo, Parse} from './http-common';

async function selectPreventiviFromCommessa(commessaId, callback, errorCallback){
    new Parse.Query(preventivo)
        .notEqualTo('eliminato', true)
        .equalTo('parent', commessaId)
        .find()
        .then( res => {
            let data = []
            res.forEach(elem => {
                let attr = elem.attributes
                data.push({
                    id: elem.id,
                    ...attr
                })
            })
            data.length === 0 ? 
                errorCallback({
                    title: 'Nessun elemento trovato',
                    message: 'Non esiste nessun disegno per la commessa ' + commessaId
                }) : callback(data)
        })
        .catch( error => 
            errorCallback({
                title: 'Errore di connessione',
                message: error.message
            })
        )
}

export {
    selectPreventiviFromCommessa
}
