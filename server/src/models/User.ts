import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document{
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

interface IThought extends Document{
    