const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
const v1 = require('./v1');

const Transaction = vstruct([
  { name: 'version', type: vstruct.UInt8 },
]);

export const encode = (tx) => {
  switch (tx.version) {
    case 1:
      return v1.encode(tx);

    default:
      throw Error('Unsupport version');
  };
};

export const decode = (data) => {
  const versionTx = Transaction.decode(data);
  switch (versionTx.version) {
    case 1:
      return v1.decode(data);
      break;
    
    default:
      throw Error('Unsupport version');
  }
};

export const getUnsignedHash = (tx) => {
  return crypto
    .createHash('sha256')
    .update(encode({
      ...tx,
      signature: Buffer.alloc(64, 0),
    }))
    .digest();
};

export const sign = (tx, secret) => {
  const key = Keypair.fromSecret(secret);
  tx.account = key.publicKey();
  tx.signature = key.sign(getUnsignedHash(tx));
};

export const verify = (tx) => {
  const key = Keypair.fromPublicKey(tx.account);
  return key.verify(getUnsignedHash(tx), tx.signature);
};

export const hash = (tx) => {
  return tx.hash = crypto.createHash('sha256')
    .update(encode(tx))
    .digest()
    .slice(0, 20)
    .toString('hex')
    .toUpperCase();
};
