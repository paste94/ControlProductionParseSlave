# Aggiornamento v0.0.2

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
- Lanciare un build
### Building
Per il building esistono vari metodi:
- `npm run build` crea un pachetto usando come *target* il sistema della macchina in uso
- `npm run buildwin32` crea un pacchetto per windows 32 bit
- `npm run buildwin64` crea un pacchetto per windows 64 bit
