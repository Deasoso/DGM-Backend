const Web3 = require('web3')
const web3 = new Web3()
const ramda = require('ramda')
const { splitEvery, compose, map } = ramda

function blockTimeStamp(timeStamp) {
    return parseInt(timeStamp, 16) * 1000
}


function decodeHexedDataNumber(dataHex) {
    const remove0xPrefix = (str) => str.slice(2)
    const splitIntoHexArray = splitEvery(64)
    const add0x = str => (`0x${str.slice(2)}`)
    const hexToDecimalStr = hex => web3.utils.toBN(hex).toString(10)

    // (Ramda) Compose exec fns from the bottom to the top 😄, functional style
    const result = compose(
        map(hexToDecimalStr),
        map(add0x),
        splitIntoHexArray,
        remove0xPrefix,
    )(dataHex)
    return result
}

function getPriceFromData(data) {
    const [tokenQty, ethPaid] = data
    return (Number(ethPaid) / Number(tokenQty)).toFixed(10)
}

module.exports = {
    blockTimeStamp,
    decodeHexedDataNumber,
    getPriceFromData
}
