const stegnograph = require('../helper/stegnograph'),
    fs = require('fs');

module.exports = {
    encrypt: (req, res) =>{
        try {
            const { message, secret_key, secret_iv } = req.body,
                encrypted_message = stegnograph.encrypt(message, secret_key, secret_iv),
                image = req.files.image,
                name = image.name.slice(0, -4),
                outputPath = stegnograph.hide(encrypted_message, image.data, name);
                if(encrypted_message !== null){
                    fs.writeFileSync(`${global.apppath}/client/src/Assets/images/${name}.txt`,
                        encrypted_message);
                    res.json({
                        status: 'Success',
                        message: 'Data encrypted successfully!',
                        data: encrypted_message,
                        path: outputPath,
                    })
                }else{
                    throw {
                        status: 'Error',
                        message: 'An error occured while encrypting data',
                        data: [],
                    };
                }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    decrypt: (req, res) =>{
        try {
            const {secret_key, secret_iv } = req.body,
                stenograph = req.files.stegnograph,
                encrypted_message = stegnograph.retrieve(stenograph.data),
                decrypted_message = stegnograph.decrypt(encrypted_message, secret_key, secret_iv);
            if(decrypted_message !== null){
                res.json({
                    status: 'Success',
                    message: 'Data decrypted successfully',
                    data: decrypted_message,
                })
            }else{
                throw {
                    status: 'Error',
                    message: 'An error occured while encrypting data',
                    data: [],
                };
            } 
        } catch (error) {
            res.status(500).json(error);
        }
    },
};