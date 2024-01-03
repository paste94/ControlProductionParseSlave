import {preventivo, Parse} from './http-common';

async function selectPreventiviFromCommessa(commessaId, callback, errorCallback){
    if(commessaId === undefined){
        callback([])
    }
    else{
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
                callback(data)
            })
            .catch( error => 
                errorCallback({
                    title: 'Errore di connessione',
                    message: error.message
                })
            )
    }
}

export {
    selectPreventiviFromCommessa
}
