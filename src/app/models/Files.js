const db = require('../../../config/db');
const fs = require('fs');


module.exports = {
    create({filename,path}){
        const query = `
        INSERT INTO files (
            name,
            path
        ) VALUES ($1,$2)
        RETURNING id`;

        const values = [
            filename,
            path
        ]

        return db.query(query,values);
    },

    find(fileId) {
        return db.query(`SELECT files.*
                     FROM  files
                    WHERE id = ${fileId}`);
    }
}