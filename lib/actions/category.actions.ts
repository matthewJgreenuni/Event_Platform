"use server"

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import Category from "../database/models/category.model";

export async function createCategory({categoryName}: CreateCategoryParams){
    try{
        await connectToDB()

        const newCategory = await Category.create({ name: categoryName})
        return JSON.parse(JSON.stringify(newCategory));

    }catch(error){
        handleError(error)
    }
}

export async function getAllCategories(){
    try{
        await connectToDB()
        const categories = await Category.find()
        return JSON.parse(JSON.stringify(categories));

    }catch(error){
        handleError(error)
    }
}