const db = require('../../../config/db');
const { hash } = require('bcrypt');
const fs = require('fs');


module.exports = {
    async findOne(filters) {
    let query = "SELECT * FROM users";

    Object.keys(filters).map(key => {
        query = `${query}
        ${key}`

        Object.keys(filters[key]).map(field => {
            query = `${query} ${field} = '${filters[key][field]}'`
        })
   
    })
    
    const results = await db.query(query);

    return results.rows[0];
    }
}