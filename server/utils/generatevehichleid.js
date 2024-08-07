const crypto = require('crypto')


function generateVehicleId(brand,model,makeYear,sequenceNumber){
    const baseId= `${brand}-${model}-${makeYear}-${sequenceNumber.toString().padStart(3,'0')}`;

    const hash = crypto.createHash('md5').update(baseId).digest('hex').slice(0,4);

    return `${baseId}-${hash}`;



}

module.exports = {generateVehicleId}