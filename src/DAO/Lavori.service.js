import {lavori, Parse} from './http-common';

function addLavoro(macchina, impiegato, commessa, preventivo, startTime, callback, errorCallback){    
    new Parse.Object(lavori)
        .set('macchina', macchina.nome)
        .set('impiegatoId', impiegato.id)
        .set('commessaId', commessa.id)
        .set('preventivoId', preventivo.id)
        .set('commessaNome', commessa.numero)
        .set('preventivoNome', preventivo.numDisegno)
        .set('inizio', startTime)
        .save()
        .then(callback)
        .catch( error => 
            errorCallback({
                title: 'Errore di connessione',
                message: error.message
            })
        )
}

function getLavori(impiegatoId, callback, errorCallback){
    new Parse.Query(lavori)
        .equalTo('impiegatoId', impiegatoId)
        .equalTo('fine', undefined)
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
                    message: 'Non è stato possibile trovare alcun lavoro per l\'impiegato ' + impiegatoId
                }) : callback(data)
        })
        .catch((error) => {
            errorCallback({
                title: 'Errore di connessione',
                message: error.message
            })
        })
}

function closeJobs(lavoriIdList, callback, errorCallback){
    lavoriIdList.forEach( lavoro => {
        new Parse.Query(lavori)
            .get(lavoro.id)
            .then((lavoro) => {
                lavoro.set('fine', new Date()).save()
            })
            .catch((error) => {
                errorCallback({
                    title: 'Errore di connessione',
                    message: error.message
                })
            })
    })
    callback()
}

export {
    addLavoro,
    getLavori,
    closeJobs
}
