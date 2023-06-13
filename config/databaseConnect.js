const mongoose = require('mongoose')



const dbconnection = async () =>{
    try{
         await mongoose.connect("mongodb+srv://hossam:0601416343@cluster0.fxv1oke.mongodb.net/companyDB?retryWrites=true&w=majority",
        {
            useUnifiedTopology : true,
            useNewUrlParser:true
        }
        )

    }catch(err){
        console.log(err)
    }
}

module.exports = dbconnection