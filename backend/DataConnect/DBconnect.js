const mongoose=require('mongoose')

const DBconnect=()=>{
    mongoose.connect(process.env.DB_url).then(()=>{
        console.log("connect the database mongoDB")
    }).catch((err)=>{
        console.log('DB not connect please check me ',err)
        process.exit(1)
    })
}


module.exports=DBconnect