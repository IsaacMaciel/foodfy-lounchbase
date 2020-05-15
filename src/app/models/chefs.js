const db = require('../../../config/db');
const {date} = require('../lib/utils');

module.exports = {

    create({name,fileId}) {
        try {
            const query= `INSERT INTO chefs (
                name,
                created_at,
                file_id
            ) VALUES ($1,$2,$3)
            RETURNING id`
            ;
    
            const values = [
                name,
                date(Date.now()).iso,
                fileId
            ];
            
            return db.query(query,values);
            
        } catch (error) {
            console.error(`Erro no create do chefs:${error}`);
        }

    },
    all() {
        try {
            const query = `SELECT chefs.*, files.path AS path
            FROM chefs
            LEFT JOIN files ON (chefs.file_id = files.id)`;
    
    
           return db.query(query);
            
        } catch (error) {
            console.error(`Erro no all do chefs:${error}`);
        }

    },
    allTotalRecipe() {
        try {
            const query = `SELECT chefs.*, COUNT (recipes) AS total
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id`
            return db.query(query);
        } catch (error) {
            
        }
    },
    findOneChef(id) {
        const query = `SELECT chefs.*
        FROM chefs
        WHERE chefs.id = ${id}`;

        return db.query(query);
    },

    find(id){
        const query = `SELECT chefs.*, COUNT (recipes) AS total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = ${id}
        GROUP BY chefs.id`;

       return db.query(query);
    }, 
    findChefandTotalRecipes(){
        const query = `SELECT chefs.*, COUNT (recipes) AS total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id`;

        return db.query(query);
    },

    recipesForChef(id){

        try {
            const query = `SELECT recipes.*,chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = ${id}
            ORDER BY created_at DESC`;
    
            return db.query(query);
            
        } catch (error) {
            console.error(`Exibindo erro no chefs recipesForChef: ${error}`);
            
        }
    },
    update(data){
        const query = `UPDATE chefs SET
                        name=($1)
                        WHERE id = $2`;

        const values = [
            data.name,
            data.id
        ];

        return db.query(query,values);
        

       

    },
    
    delete(id) {
        const query = `DELETE FROM chefs
                    WHERE id = ${id}`;

       return db.query(query);       
    }
}