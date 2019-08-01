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
  generateName: () => {
    got('https://my.api.mockaroo.com/projectnames.json?key=f4fa2230', { json: true }).then(response => {
      let nounList = []
      response.forEach(element => {
        nounList.push(element.phonetic)
        nounList.push(element.firstname)
        nounList.push(element.color)
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
