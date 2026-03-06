import express from "express";
import OrderCustomer from "../models/OrderCustomer.js";

const router = express.Router();

router.get("/", async (req,res)=>{
  const customers = await OrderCustomer.find().sort({createdAt:-1});
  res.json(customers);
});

router.post("/", async (req,res)=>{
  try{
    const customer = new OrderCustomer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  }catch(err){
    res.status(400).json({error:err.message});
  }
});

router.delete("/:id", async (req,res)=>{
  await OrderCustomer.findByIdAndDelete(req.params.id);
  res.json({message:"Order customer deleted"});
});

export default router;