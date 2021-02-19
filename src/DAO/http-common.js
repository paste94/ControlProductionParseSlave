import Parse from 'parse'

Parse.initialize('ParseServerAzzalin');
Parse.serverURL = 'http://localhost:1337/parse'

const commesse = 'commesse'
const impiegati = 'impiegati'
const articoli = 'articoli'
const preventivo = 'preventivo'
const lavori = 'lavori'

function strToDate(date){
  console.log(date)
  if(date === ''){
      return ''
  }
  const [dd,mm,yyyy] = date.split('/')
  const str = mm + '/' + (parseInt(dd)+1) + '/' + yyyy
  return new Date(str).toISOString()
}

function dateToStr(date){
  if(date === ''){
      return ''
  }
  const arr = date.split('T')
  const [yyyy, mm, dd] = arr[0].split('-')
  return dd + '/' + mm + '/' + yyyy
}

export {commesse, impiegati, articoli, preventivo, lavori, strToDate, dateToStr, Parse}
