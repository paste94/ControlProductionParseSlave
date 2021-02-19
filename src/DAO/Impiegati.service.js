import { impiegati, Parse} from './http-common';

/**Ottiene tutti gli impiegati dal database
 * 
 * @param {*} responseCallback callback per successo.
 */
function getImpiegatoFromChip(chip, callback, errorCallback){    
    new Parse.Query(impiegati)
        .notEqualTo('eliminato', true)
        .equalTo('chip', chip)
        .find()
        .then((res) => {
            let data = []
            res.forEach(elem => 
                data.push({
                    id: elem.id,
                    ...elem.attributes
                })
            )
            data.length === 0 ? 
                errorCallback({
                    title: 'Nessun elemento trovato',
                    message: 'Non è stato possibile trovare alcun dipendente con il numero di chip ' + chip
                }) : callback(data)
        })
        .catch((error) => {
            errorCallback({
                title: 'Errore di connessione',
                message: error.message
            })
        })
}

export {getImpiegatoFromChip};
