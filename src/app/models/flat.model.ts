import {Room} from './room.model';
export class Flat {
    constructor(
    public location?:String,
    public street?: String,
    public number?: String,
    public description?:String,
    public Rooms?:Array<Room>,
    public data?: Date) { }
}