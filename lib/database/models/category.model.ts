import { Schema, models, model } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
}

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true}
})

const Catagory = models.Catagory || model('Category', categorySchema);

export default Catagory;