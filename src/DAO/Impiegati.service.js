/* eslint-disable no-throw-literal */
import { impiegati, lavori, Parse} from './http-common';

/**Ottiene l'impiegato dal DB dato il chip
 * 
 * @param {*} chip Il chip collegato all'impiegato.
 * @param {*} callback Callback per successo.
 * @param {*} errorCallback Callback per errore.
 * 
 * @returns impiegato
 */
async function getImpiegatoFromChip(chip, callback, errorCallback) {
    try {    
        let impiegato = {}
        let lavoriInCorso = []

        const queryImpiegato = await new Parse.Query(impiegati)
            .notEqualTo('eliminato', true)
            .equalTo('chip', chip)
            .find()

        if(queryImpiegato.length === 0){
            throw 'Non è stato possibile trovare alcun dipendente con il numero di chip ' + chip
        }

        impiegato = {
            id: queryImpiegato[0].id,
            ...queryImpiegato[0].attributes
        }

        const queryLavori = await new Parse.Query(lavori)
            .notEqualTo('eliminato', true)
            .equalTo('impiegatoId', impiegato.id)
            .find()

        queryLavori.forEach(elem => {
            lavoriInCorso.push(elem.id)
        })

        impiegato['lavoriInCorso'] = lavoriInCorso
        
        callback(impiegato)
    } catch (err) {
        errorCallback({
            title: 'Errore',
            message: err
        })
    }
}

export {getImpiegatoFromChip};
