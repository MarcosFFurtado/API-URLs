import { Schema } from 'mongoose';

const urlSchema = new Schema({
  description: { type: String, required: true },
  url: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 100 },
  
});