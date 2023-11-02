import {lavori, Parse} from './http-common';

function addLavoro(macchina, impiegato, commessa, preventivo, startTime, callback, errorCallback){    
    new Parse.Object(lavori)
        .set('macchina', macchina.nome)
        .set('impiegatoId', impiegato.id)
        //.set('impiegatoNome', impiegato.nome)
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


// function subtractDates(date_future, date_now){
//     // get total seconds between the times
//     let delta = Math.abs(date_future - date_now) / 1000;
//     console.log(date_future)
//     // calculate (and subtract) whole days
//     let days = Math.floor(delta / 86400);
//     delta -= days * 86400;
//     // calculate (and subtract) whole hours
//     let hours = Math.floor(delta / 3600) % 24;
//     delta -= hours * 3600;
//     // calculate (and subtract) whole minutes
//     let minutes = Math.floor(delta / 60) % 60;
//     delta -= minutes * 60;
//     console.log(hours,':',minutes)
//     return hours + ':' + minutes
//   }

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
            .then( lavoroQuery => {
                const fine = new Date()
                lavoroQuery
                    .set('fine', fine)
                    //.set('tempo', subtractDates(lavoro.inizio, fine))
                    .save()
            })
            .catch( error => 
                errorCallback({
                    title: 'Errore di connessione',
                    message: error.message
                })
            )
    })
    callback()
}

export {
    addLavoro,
    getLavori,
    closeJobs
}
