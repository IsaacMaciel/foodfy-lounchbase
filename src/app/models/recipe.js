const db = require('../../../config/db');
const {date} = require('../lib/utils');


module.exports = {

    create(data){
        try {
            const query=`INSERT INTO recipes (
                        chef_id,
                          title,
                          ingredients,
                          preparation,
                          information,
                        created_at
            ) VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING id`;
    
            const values = [
                data.chef,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso
    
            ];
    
            return db.query(query,values);
            
        } catch (error) {
            console.error(`Erro no create do recipe:${error}`);
            
        }

    },

    selectedChef() {

        const query = `SELECT id,name from chefs;`

        return db.query(query);
        
    },
    index(){
        try {
            const query = `SELECT recipes.*,chefs.name  AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY created_at DESC`;
            return db.query(query);
            
        } catch (error) {
            console.error(`Erro no index do recipe: ${error}`);
            
        }
    },
    find(id) {
        try {
            const query = `SELECT recipes.*,chefs.name  AS author
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = ${id}
            `
            
           return db.query(query);
            
        } catch (error) {
            console.error(`Erro no find do Recipe: ${error}`);
            
        }

    },

    update(data) {
        const query = `UPDATE recipes SET
                chef_id=($1),
                title=($2),
                ingredients=($3),
                preparation=($4),
                information=($5)
                WHERE id = $6`
        
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ];

      

       return db.query(query,values);
    },
    foundBy(filter){
        const query = `SELECT recipes.*,chefs.name  AS author
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        ORDER BY updated_at DESC`;

        return db.query(query);
    },

    delete(id) {
        const query = `DELETE FROM recipes
                        WHERE id = ${id}`;
        
       return db.query(query);        
    }

   
}