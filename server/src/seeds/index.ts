import db from '../config/connection';
import User from '../models/User';
import Thought from '../models/Thought';
import cleanDB from './cleanDB';
import { getRandomUsers, getRandomThoughts, getRandomReactions, getRandomArrItem } from './data';

const seedDatabase = async () => {
  try {
    await db();
    console.log('Connected to database.');

    await cleanDB();

    // Seed users
    const users = getRandomUsers(6);
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users.`);

    // Seed thoughts
    const usernames = createdUsers.map((user) => user.username);
    const thoughts = getRandomThoughts(10, usernames);
    const createdThoughts = await Promise.all(
      thoughts.map(async (thought) => {
        const newThought = await Thought.create(thought);
        await User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: newThought._id } }
        );
        return newThought;
      })
    );
    console.log(`Created ${createdThoughts.length} thoughts.`);

    // Add random reactions
    const reactions = getRandomReactions(20, usernames);
    await Promise.all(
      reactions.map(async (reaction) => {
        const randomThought = getRandomArrItem(createdThoughts);
        await Thought.findByIdAndUpdate(
          randomThought._id,
          { $push: { reactions: reaction } },
          { new: true, runValidators: true }
        );
      })
    );
    console.log('Reactions added.');

    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
