const got = require('got')
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')
const nounListLength = 50

var adjectives = []

var loadAdjectives = function () {
  console.log('Loading adjectives...')
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
  generateNodes: () => {
    got('https://my.api.mockaroo.com/nodenames.json?key=f4fa2230', { json: true }).then(response => {
      if (response.error) {
        console.log(response.error)
        return null
      }
      let nounList = []
      response.forEach(element => {
        nounList.push(element.phonetic)
        nounList.push(element.firstname)
        nounList.push(element.color)
      })
      nounList.forEach(noun => {
        noun =  `${capitalize(adjectives[Math.floor(Math.random() * (adjectives.length-1))])} ${noun}`
      })
      return nounList
    }).catch(error => {
      console.log(error.response)
    })  
  },
}
