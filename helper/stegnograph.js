const crypto = require('crypto'),
    fs = require('fs'),
    steggy = require('steggy-noencrypt'),
    config = require('../server/config'),
    imageConverter = require('../helper/imageConverter'),
    //{ secret_key, secret_iv, algorithm } = config;
    { algorithm } = config;

//generate secret has with crypto to use for encryption
/* const key = crypto.createHash('sha512')
    .update(secret_key).digest('hex').substring(0, 32),
    iv = crypto.createHash('sha512')
    .update(secret_iv).digest('hex').substring(0, 16); */


module.exports = {
    encrypt: (message, key, iv) =>{ // a function to encrypt data using the crypto module
        try {
            //generate secret has with crypto to use for encryption
            const secret_key = crypto.createHash('sha512')
                .update(key).digest('hex').substring(0, 32),
            secret_iv = crypto.createHash('sha512')
                .update(iv).digest('hex').substring(0, 16);
            const cipher = crypto.createCipheriv(algorithm, secret_key, secret_iv);
            return Buffer.from(cipher.update(message, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
        } catch (err) {
            throw {
                code: 'ENCERR',
                message: 'Invalid secrete, vector initialization key or algorithm provided',
                data: err,
            };
        }
    },
    decrypt: (encrypted_message, key, iv) =>{// a function to decrypt the data using the crypto module
        //generate secret has with crypto to use for encryption
        try {
            const secret_key = crypto.createHash('sha512')
                .update(key).digest('hex').substring(0, 32),
            secret_iv = crypto.createHash('sha512')
                .update(iv).digest('hex').substring(0, 16);
            const buff = Buffer.from(encrypted_message, 'base64');
            const decipher = crypto.createDecipheriv(algorithm, secret_key, secret_iv);
            return( decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'));
        } catch (err) {
            throw {
                code: 'KEYERR',
                message: `Invalid encrypt keys or algorithm provived!`,
                data: err,
            }
        }
    },
    hide: (encrypted_message, image, file_name) =>{// a function to hide data in image file using the stegcloak module
        const outputPath = `${global.apppath}/client/src/Assets/images/${file_name}.png`;
        //make sure image is in png format
        imageConverter.convert(image).then((convertedImage) =>{
            const concealed = steggy.conceal(convertedImage, encrypted_message);
            fs.writeFileSync(outputPath, concealed);
        }).catch(err => {
            throw {
                status: 'Error',
                message: err.message ? ` ${err.message}` :
                    'An error occured while converting image file',
                data: err,
            };
        });
        return outputPath;
    },
    retrieve: image => {//a function to retrieve data from image file
        try {
            revealed = steggy.reveal(image, 'utf8');
            return revealed;
        } catch (err) {
            throw {
                code: 'IMGERR',
                message: `Invalid Stegnograph image provided, make sure the image is a stegnograph`,
                data: err,
            };
        }
    }, 
};