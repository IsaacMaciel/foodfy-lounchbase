const db = require('../../../config/db');
const fs = require('fs');


module.exports = {
    create({filename,path,product_id}){
        const query = `
        INSERT INTO files (
            name,
            path
        )
        `
    }
}