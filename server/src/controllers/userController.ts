import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST create new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// PUT update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// DELETE user and associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
        res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST add friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// DELETE remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

