const {connectdb}=require('./connect');
const express = require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());

connectdb()
    .then(()=>{console.log("Db Connected")})
    .catch(err=>{console.log(err)});

const controller=require('./controller')

app.post('/api/login',controller.login);
app.post('/api/register',controller.register);
app.get('/api/users',controller.getAllUsers);
app.put('/api/user/:id',controller.updateUser);


//vehicles
app.post('/api/vehicles',controller.insertvehicles);
app.delete('/api/vehicle/:id',controller.deleteVehicle);




//services
app.post('/api/services',controller.createService);
app.get('/api/services',controller.getAllServices);
app.put('/api/service/:id',controller.updateService);
app.delete('/api/service/:id',controller.deleteService);


const port=4444;
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})



  

