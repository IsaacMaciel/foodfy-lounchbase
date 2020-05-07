const db = require('../../../config/db');

module.exports = {

    create(recipe_id,file_id) {

        try {
            const query = `INSERT INTO recipe_files(
                recipe_id,
                file_id
                ) VALUES ($1,$2)`
    
    
            const values = [
                recipe_id,
                file_id
            ]    
            return db.query(query,values);    
            
        } catch (error) {
            console.error(`Erro no create do recipe_files:${error}`);
            
        }
    
        

    },
    find (id) {
        const query = `  SELECT recipe_files.*, files.path AS path, files.name AS name
                FROM recipe_files 
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                WHERE recipe_files.recipe_id = ${id}
                ORDER BY recipe_files.recipe_id`;
                
                return db.query(query);
    },
    findbyRecipe (id) {
        try {
            const query = `SELECT *
            from recipe_files
            WHERE recipe_files.recipe_id = ${id}
            ORDER BY recipe_files.file_id`;
    
            return db.query(query);
            
        } catch (error) {
            console.error(`Erro no find do recipe_files: ${error}`);
        }
    },
    delete(id) {
        try {
            return db.query(`DELETE from recipe_files
            WHERE file_id = ${id}`);
            
        } catch (error) {
            console.error(`Erro no delete do recipe_files: ${error}`);
        }
    }

}