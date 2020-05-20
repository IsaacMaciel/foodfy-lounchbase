const db = require('../../../config/db');
const fs = require('fs');



module.exports = {
    create({filename,path}){
        try {
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
            
        } catch (error) {
            console.error(`Erro no create do Files:${error}`);
            
        }
    },
    update(file,id) {
        const query = ` UPDATE files SET
                        name=($1),
                        path=($2)
                        WHERE id = $3`;
        const values = [
            file.filename,
            file.path,
            id
        ]         

        return db.query(query,values);

    },

    find(fileId) {
        try {
            return db.query(`SELECT files.*
                         FROM  files
                        WHERE id = ${fileId}`);
            
        } catch (error) {
            console.error(`Erro no create do FIND Files:${error}`);
        }
    },

   async delete(id) {
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = ${id}`);
            const file = result.rows[0];
            fs.unlinkSync(file.path); 

            await db.query(`DELETE FROM files WHERE id = ${id}`);
            return;
            
        } catch (error) {
            console.error(`Erro no DELETE do Files: ${error}`);
            
        }
    }
}