const vstruct = require('varstruct');
const base32 = require('base32.js');
const { Keypair } = require('stellar-base');

const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

const Followings = vstruct([
    { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);


function encodeText(content) {
    return PlainTextContent.encode(content)
}

function decodeText(content){
    return PlainTextContent.decode(content)
}

function encodeFollowings(content) {
    return Followings.encode(content)
}

function decodeFollowings(content){
    return Followings.decode(content)
}

module.exports = { encodeText, decodeText,encodeFollowings,decodeFollowings }
