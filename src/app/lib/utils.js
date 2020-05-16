module.exports = {

    date(timestamp) {
        const birth = new Date(timestamp);

        const year = birth.getUTCFullYear();
        const month = `0${birth.getUTCMonth() + 1}`.slice(-2);
        const day = `0${birth.getUTCDate()}`.slice(-2);


        return {
            year,
            month,
            day,
            format:`${day}/${month}/${year}`,
            birthDay: `${day}/${month}`,
            iso:`${year}-${month}-${day}`
        }

    },
    checkAllFields(body) {
        const keys = Object.keys(body);
   
        for(key of keys)  {
            if(body[key] == "") {
                return {
                    error:"Por favor, preencha todos os campos",
                    user:body,
                    token:body.token
                }
            }
        }
   
   }




}
