"use server"

import { CreateEventParams } from "@/types";
import { connectToDB } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

export async function createEvent({ event, userId, path}: CreateEventParams) {
    try{
        await connectToDB()
        const organizer = await User.findById(userId);

        if(!organizer) throw new Error ("Organizer not found");
        const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId})

        return JSON.parse(JSON.stringify(newEvent));

    } catch(error){
        handleError(error)
    }
}