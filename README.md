# Aggiornamento v0.0.2

## Installazione
Una volta clonato il progetto da git, esegui il comando ` yarn install ` per installare le dipendenze. 

## Developing
per eseguire il programma in developer mode è necessario 
- Modificare nel file `http-common.js` la riga 5, sostituendo `Parse.serverURL = serverUrl.URL` con `Parse.serverURL = serverUrl.URLTest`
- Digitare il comando `npm start` per eseguire.

## Rilascio in produzione
### Operazioni preliminari
- Controllare che nel file `http-common.js` alla riga 5 sia presente `Parse.serverURL = serverUrl.URL` (potrebbe essere indicato `Parse.serverURL = serverUrl.URLTest`, che non funziona in produzione). 
- Modificare il numero della versione!!!
### Building
Esistono due metodi di building, quello a 32 e a 64 bit. Per la versione a 32 bit eseguire il comando ` npm run build32`, mentre per la versione a 64 but eseguire ` npm run build`. Potrebbero volerci alcuni minuti. Verrà poi creata una cartella `build` contiene il programma eseguibile, criptato con asar e portatile. La cartella `dist` conterrà invece il pacchetto eseguibile con il quale è possibile installare il programma su altri dispositivi. Il programma viene installato sul path `C:\Users\username\AppData\Local\Programs\control-production-slave` dove **username** è il nome dell'utente del PC

