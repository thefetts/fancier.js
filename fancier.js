const fancy = {
  lower: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
  upper: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  prototype: '𝖕𝖗𝖔𝖙𝖔𝖙𝖞𝖕𝖊'
}

const boring = 'abcdefghijklmnopqrstuvwxyz'
const loud = false

function fancify(object) {
  const fancyName = getFancyString(object.name)
  window[fancyName] = object

  const objectProps = Object.getOwnPropertyNames(window[fancyName])
  fancifyProps(objectProps, window[fancyName])

  const objectProtoProps = Object.getOwnPropertyNames(window[fancyName][fancy.prototype])
  fancifyProtoProps(objectProtoProps, window[fancyName])
}

function fancifyProps(objectProps, object) {
  object.fancyName = getFancyString(object.name)
  log(`${object.name}.fancyName is now ${object.fancyName}`)

  objectProps.forEach(prop => {
    const fancyProp = getFancyString(prop)

    try {
      object[fancyProp] = object[prop]
      log(`${object.fancyName}.${prop} is now ${object.fancyName}.${fancyProp}`)
    } catch (err) {
      log(`Unable to fancify ${object.name}.${prop} 😢`)
    }
  })
}

function fancifyProtoProps(objectProps, object) {
  objectProps.forEach(prop => {
    const fancyProp = getFancyString(prop)

    try {
      object[fancy.prototype][fancyProp] = object[fancy.prototype][prop]
      log(`${object.fancyName}.${fancy.prototype}.${prop} is now ${object.fancyName}.${fancy.prototype}.${fancyProp}`)
    } catch (err) {
      log(`Unable to fancify ${object.fancyName}.${fancy.prototype}.${prop} 😢`)
    }
  })
}

function getFancyString(prop) {
  return prop.split('').map(character => {
    if (!isLetter(character)) return character

    const boringIndex = boring.indexOf(character.toLowerCase())
    if (isUpperCase(character)) return getFancy(boringIndex, fancy.upper)
    return getFancy(boringIndex, fancy.lower)
  }).join('')
}

function isLetter(character) {
  return character.toLowerCase() !== character.toUpperCase()
}

function isUpperCase(letter) {
  return letter === letter.toUpperCase()
}

function getFancy(boringIndex, set) {
  return set.split('').splice(boringIndex * 2, 2).join('')
}

function log(message) {
  if (loud) console.log(message)
}

[Object, Array, Set, Map, Function].forEach(object => fancify(object))
