import { macchine, Parse} from './http-common';

/**
 * Ottiene tutte le macchine dal database
 * @param {function} callback callback per successo.
 * @param {function} callbackError callback per errore.
 */
 function getAllMacchine(callback, callbackError) {
    new Parse.Query(macchine)  
        .notEqualTo('eliminato', true)
        .find()
        .then( result => {
            const data = []
            result.forEach(elem => {
                data.push({
                    id: elem.id,
                    ...elem.attributes,
                })
            })
            callback(data)
        }, (error) => {
            console.log('ERRORE:', error)
            callbackError(error.message)
        })
}

export {getAllMacchine};
