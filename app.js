const path =require('path')
const request =require('postman-request')
const express =require('express')
const hbs =require('hbs')
const { query } = require('express')
const QueryString = require('qs')
const app = express()


const city = "Jharsuguda";
const api= '859c6bac1ada30c78318021c5b7520d0';
const getTemp = (city,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key='+api+'&query='+city;
    request({url: url, json: true},(error,response)=>{
        if (error){
            callback("Connection Failed!!!",undefined)
        } else {
            callback(undefined,response)
        }
    });
}

/*
getTemp(city,(err,data)=> {
    if (err){
        console.log(err);
        return error;
    } else {
        return data;
    }
})
*/

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

hbs.registerPartials(path.join(__dirname,'/views/partials'))

app.use(express.static(path.join(__dirname,"/public")))
 
app.get('/', (req,res) =>{
    var city =req.query.location
    var data1 = {
        err: "",
        reslut: ""
    }
    getTemp(city,(err,data)=> {
        if (err){
            data1.err='Please Check Your Connection or Request';
            res.render('index',data1)
            return err;
        } else {
            data1.reslut  = data
            console.log(data1.reslut)
            res.render('index.hbs',data1)
        }
})
})

app.listen(3000,()=>{
    console.log("Port 3000 Running")
})