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

const ReactContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'reaction', type: vstruct.UInt8 },
]);

function encodeReact(content) {
    return ReactContent.encode(content)
}

function decodeReact(content){
    return ReactContent.decode(content)
}

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

module.exports = { encodeText, decodeText,encodeFollowings,decodeFollowings,decodeReact,encodeReact}
