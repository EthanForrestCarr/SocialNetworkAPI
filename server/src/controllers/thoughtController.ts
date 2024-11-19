import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// GET thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST create new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = await Thought.create({ thoughtText, username });
        await User.findByIdAndUpdate(
            userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.status(201).json(newThought);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// PUT update thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// DELETE thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );
        res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST add reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// DELETE reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};