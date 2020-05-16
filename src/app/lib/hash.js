const bcrypt = require('bcryptjs');

const value = "@mdk3t50"

async function hashTo(value) {

   let results = await  bcrypt.hash(value,8);
   return console.log(results);
}

hashTo(value);