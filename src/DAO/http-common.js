import Parse from 'parse'

Parse.initialize('ControlProductionServer', 'CP_m4st3r_k3y');
Parse.serverURL = localStorage.getItem('ServerUrl') + '/parse'

const commesse = 'commesse'
const impiegati = 'impiegati'
const articoli = 'articoli'
const preventivo = 'preventivo'
const lavori = 'lavori'
const macchine = 'macchine'

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

export {commesse, impiegati, articoli, preventivo, lavori, macchine, strToDate, dateToStr, Parse}
