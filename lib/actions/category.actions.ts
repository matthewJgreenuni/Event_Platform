"use server"

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import Category from "../database/models/category.model";

export async function createCategory({categoryName}: CreateCategoryParams){
    try{
        await connectToDB()

        const newCategory = await Category.create({ name: categoryName})

    }catch(error){
        handleError(error)
    }
}