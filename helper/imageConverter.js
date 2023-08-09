const sharp = require('sharp');

module.exports = {
    convert: async(buffer) =>{
        try {
            return await sharp(buffer).toFormat('png').toBuffer();
        } catch (error) {
            throw {
                status: 'Error',
                message: `Error converting file: ${error.message}` 
                    || 'An error occured while converting image to png',
                data: [],
            };
        }
    },
};