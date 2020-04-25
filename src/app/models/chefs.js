const db = require('../../../config/db');
const {date} = require('../lib/utils');

module.exports = {

    create(data,callback) {
        console.log(data);
        const query= `INSERT INTO chefs (
            name,
            avatar_url,
            created_at
        ) VALUES ($1,$2,$3)
        RETURNING id`
        ;

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ];
        
        db.query(query,values,(err,result)=>{
            if (err) throw `Erro: ${err}`;

            callback(result.rows[0]);
        })

    },
    all(callback) {

        const query = `SELECT *
        FROM chefs;`;


        db.query(query,(err,results) => {
            if (err) throw `Erro: ${err}`
            callback(results.rows);
        })

    },

    find(id,callback){
        const query = `SELECT chefs.*, COUNT (recipes) AS total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`;

        db.query(query,[id],(err,results)=>{
            if (err) throw `Erro: ${err}`
            callback(results.rows[0]);
        })
    },
    findChefandTotalRecipes(callback){
        const query = `SELECT chefs.*, COUNT (recipes) AS total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id`;

        db.query(query,(err,results)=>{
            if (err) `Erro:${err}`;
            callback(results.rows);
        })
    },

    recipesForChef(id,callback){
        const query = `SELECT recipes.*,chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = ${id}`;

        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`
            callback(results.rows);
        })
    },
    update(data,callback){
        const query = `UPDATE chefs SET
                        name=($1),
                        avatar_url=($2)
                        WHERE id = $3`;

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ];

        console.log(`Exibindo a const VALUES = ${values}`);

        db.query(query,values,(err,results)=>{
            if (err) throw `Erro:${err}`
            callback();
        })

    },
    edit(id,callback) {
        const query = `SELECT * FROM chefs
        WHERE chefs.id = ${id}`;

        db.query(query,(err,results)=>{
            if (err) throw `Erro:${err}`
            callback(results.rows[0]);
        })
    },
    delete(id,callback) {
        const query = `DELETE FROM chefs
                    WHERE id = ${id}`;

        db.query(query,(err,results)=>{
            if (err) throw `Erro: ${err}`;
            callback();
        })            
    }
}