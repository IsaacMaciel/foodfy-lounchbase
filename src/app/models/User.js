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
    },
    async create(data) {
        const query = `INSERT INTO users (
            name,
            email,
            password,
            is_admin
        ) VALUES ($1,$2,$3,$4)
        `
        //Criando o Hash da senha para passar para o banco
        const passwordHash = await hash(data.password,8);


        const values = [
            data.name,
            data.email,
            passwordHash,
            data.is_admin || false,

        ];

        db.query(query,values);

    },
    async update(id,fields) {
        let query = `UPDATE users SET`;

        Object.keys(fields).map((key,index,array) => {
            if((index +1) < array.length) {
                query = `${query}
                ${key} = '${fields[key]}',
                `;
            } else {
                query = `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}`;
            }
        })

        await db.query(query);
        return
    },
    async all() {
        let results;
        const query = `SELECT * from users`;
        results = await  db.query(query);
        
        return results.rows;
    },
    async delete(id) {

        try {
            const query = `DELETE  FROM
            users
            WHERE id = ${id}`;
    
            await db.query(query);
            
            
        } catch (error) {
            console.error(error);
        }
    }
}