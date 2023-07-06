const {user,service,vehicle}=require('./schema');
const bcrypt=require('bcrypt');

module.exports.login=async(req,res)=>{
    const users=await user.findOne({email:req.body.email})
    if(!users)
    {
        return res.send("Invalid Credentials")
    }
    if(req.body.password!==users.password)
    {
        return res.send("Invalid Credentials");
    }
    return res.send("Login Successful!");
}


module.exports.register=async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users=new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        phone:req.body.phone
    })
    const existing=await user.findOne({email:req.body.email})
    if(existing){
        return res.send("User already exists with the entered Email Id");
    }
    else{
        const save_user=await users.save();
        return res.send({ message: "Registered Successfully!", user: save_user });
        
    }
}

module.exports.updateUser=async(req,res)=>{
  try {
    const {name,email,password,address,phone} = req.body;

    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {name,email,password,address,phone},
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json("User Updated");
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while updating the user' });
  }
}
module.exports.insertvehicles=async (req, res) => {
    const vehicles = new vehicle({
      make: req.body.make,
      model: req.body.model,
      year: Number(req.body.year),
      vin: req.body.vin,
      mileage: Number(req.body.mileage),
      owner: req.body.owner
    });
    const newvehicle=await vehicle.findOne({vin:req.body.vin})
    if(newvehicle)
    {
        return res.send("Vehicle already registered")
    }
    await vehicles.save();
    res.send(vehicles);
};

module.exports.updateService = async (req, res) => {
  try {
    const { vehicle, date, description, cost } = req.body;
    const updatedService = await service.findByIdAndUpdate(
      req.params.id,
      { vehicle, date, description, cost },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while updating the service' });
  }
};

module.exports.deleteVehicle=async(req,res)=>{
  try
  {
    const deleteVehicle =await vehicle.findByIdAndDelete(req.params.id);
    if(!deleteVehicle)
    {
      return res.status(404).json("Vehicle not found!");
    }
    else{
    return res.send("Vehicle deleted");
    }
  }
    catch (error) {
      res.status(500).json({ error: 'Error occurred while deleting the service' });
    }
}

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while fetching users' });
  }
};

module.exports.createService = async (req, res) => {
      const services = new service({
            vehicle:req.body.vehicle,
            date:req.body.date,
            description:req.body.description,
            cost:req.body.cost,
      });
      const savedService = await services.save();
      return res.send(savedService);
  };
  
  module.exports.getAllServices = async (req, res) => {
    try {
      const services = await service.find().populate('vehicle');
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: 'Error occurred while fetching services' });
    }
  };


  module.exports.updateService = async (req, res) => {
    try {
      const { vehicle, date, description, cost } = req.body;
      const updatedService = await service.findByIdAndUpdate(
        req.params.id,
        { vehicle, date, description, cost },
        { new: true }
      );
      if (!updatedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ error: 'Error occurred while updating the service' });
    }
  };
  
  module.exports.deleteService=async(req,res)=>{
    try
    {
      const deleteService =await service.findByIdAndDelete(req.params.id);
      if(!deleteService)
      {
        return res.status(404).json("Service not found!");
      }
      else{
      return res.send("Serivce deleted");
      }
    }
      catch (error) {
        res.status(500).json({ error: 'Error occurred while updating the service' });
      }
  }
