const got = require('got')
const uuid = require('uuid/v4');
var fs = require('fs')
const nounListLength = 50

var adjectives = []

var loadAdjectives = function () {
  fs.readFile('adj.txt', 'utf8', function (err, data) {
    if (err) throw err
    adjectives = data.split('\r\n')
    return err
  })
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

loadAdjectives();

module.exports = {
  generateName: (includeGenres) => {
    got('https://my.api.mockaroo.com/projectnames.json?key=f4fa2230', { json: true }).then(response => {
      let wordList = includeGenres
      let nounList = []
      wordList.forEach(element => {
        if (element === 'Last names') nounList.push(element)
        if (element === 'Female first names') nounList.push(element)
        if (element === 'Male first names') nounList.push(element)
        if (element === 'Races') nounList.push(element)
        if (element === 'State names') nounList.push(element)
        if (element === 'Movie genre') nounList.push(element.split('|')[0])
        if (element === 'Foods') nounList.push(element.split(' ')[0])
        if (element === 'Animals') nounList.push(element.split(' ')[0].replace(',', ''))
        if (element === 'Car makes') nounList.push(element)
        if (element === 'Car models') nounList.push(element)
        if (element === 'Cities') nounList.push(element)
        if (element === 'Countries') nounList.push(element)
        if (element === 'Colors') nounList.push(element)
      })

      return `${capitalize(adjectives[Math.floor(Math.random() * (adjectives.length-1))])} ${capitalize(nounList[Math.random * (nounListLength-1)])}`
    }).catch(error => {
      console.log(error.response)
    })  
  },
  
  generateKey: () =>{
    return uuid();
  }
}
