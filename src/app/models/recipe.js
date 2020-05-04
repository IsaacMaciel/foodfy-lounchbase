const db = require('../../../config/db');
const {date} = require('../lib/utils');


module.exports = {

    create(data){
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

    },

    selectedChef(callback) {

        const query = `SELECT id,name from chefs;`

        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`
            callback(results.rows);

        })
    },
    index(callback){
        const query = `SELECT recipes.*,chefs.name  AS author
                        FROM recipes
                        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`;
        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`;
            callback(results.rows);
        })
    },
    details(id,callback) {
        const query = `SELECT recipes.*,chefs.name  AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = ${id}
        `
        
        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`
            console.log(results.rows);
            callback(results.rows[0]);
        })

    },

    update(data,callback) {
        const query = `UPDATE recipes SET
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
                WHERE id = $7`
        
        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ];

      

        db.query(query,values,(err,results)=>{
            if (err) throw `Erro:${err}`
            callback();
        })
    },
    foundBy(filter,callback){
        const query = `SELECT recipes.*,chefs.name  AS author
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'`;

        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`;

            callback(results.rows);
        })
    },

    delete(id,callback) {
        const query = `DELETE FROM recipes
                        WHERE id = ${id}`;
        
        db.query(query,(err,results)=>{
            if(err) throw `Erro:${err}`;
            callback();
        })                
    }

   
}