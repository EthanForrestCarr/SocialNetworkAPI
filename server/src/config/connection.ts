import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ethan:aoioWnNJCQ8deYMI@cluster0.f49g2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;
