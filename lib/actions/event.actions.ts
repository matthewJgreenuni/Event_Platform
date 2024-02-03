"use server"

import { CreateEventParams } from "@/types";
import { connectToDB } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";

async function populateEvent(query: any) {
    return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName'})
    .populate({ path: 'category', model: Category, select: '_id name'})
}

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

export async function getEventById(eventId: string) {
    try{
        connectToDB();
        const event = await populateEvent(Event.findById(eventId))
        if (!event){
            throw new Error ("Event not found")
        } 
        return JSON.parse(JSON.stringify(event))

    }catch(error){
        handleError(error)
    }
}

