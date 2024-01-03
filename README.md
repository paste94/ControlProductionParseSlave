# Aggiornamento v2.3.0
Fix: risolta prima lettura di un lavoro

## Installazione
Una volta clonato il progetto da git, esegui il comando `yarn install` per installare le dipendenze. 

## Developing
per eseguire il programma in developer mode è necessario 
- Modificare nel file `http-common.js` la riga 5, sostituendo `Parse.serverURL = serverUrl.URL` con `Parse.serverURL = serverUrl.URLTest`
- Digitare il comando `npm start` per eseguire.

## Rilascio in produzione
### Operazioni preliminari
- Modificare il numero della versione
- Modificare il numero del tag `git tag v*.*.*` allineandolo al numero di versione
### Building
Per il building esistono vari metodi:
- `yarn run build` crea un pachetto usando come *target* il sistema della macchina in uso
- `yarn run buildwin32` crea un pacchetto per windows 32 bit
- `yarn run buildwin64` crea un pacchetto per windows 64 bit
### Publish
Per pubblicare l'eseguibile su github, lanciare
- `yarn run releasewin64` per la versione a 64 bit
- `yarn run releasewin32` per la versione a 32 bit