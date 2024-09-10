const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; 
const secretKey = process.env.SECRET_KEY; // A 32-byte secret key
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt a message
exports.encryptMessage = (message) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Decrypt a message
exports.decryptMessage = (encryptedMessage) => {
    const [iv, encryptedText] = encryptedMessage.split(':');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};