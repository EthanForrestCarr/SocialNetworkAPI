const usernames = [
    'sharkfan123',
    'piano_master',
    'skater_boi',
    'aurora_hunter',
    'coding_wiz',
    'nature_lover',
  ];
  
  /*
  const emails = [
    'sharkfan123@example.com',
    'pianomaster@example.com',
    'skaterboi@example.com',
    'aurorahunter@example.com',
    'codingwiz@example.com',
    'naturelover@example.com',
  ];
  */

  const thoughtTexts = [
    'Skateboarding is life!',
    'Music is the language of the soul.',
    'Sharks are amazing creatures.',
    'Just saw an incredible aurora!',
    'Coding is both art and science.',
    'Nature always finds a way.',
  ];
  
  const reactionTexts = [
    'Totally agree!',
    'That’s so true.',
    'Amazing thought!',
    'Well said!',
    'Couldn’t agree more!',
    'Inspiring!',
  ];
  
  // Utility to get a random item from an array
  export const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Utility to generate random users
  export const getRandomUsers = (count: number) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const username = getRandomArrItem(usernames);
        const email = `${username.replace(/[^a-zA-Z0-9]/g, '')}${i}@example.com`;
        users.push({ username, email });
    }
    return users;
};
  
  // Utility to generate random thoughts
  export const getRandomThoughts = (count: number, usernames: string[]) => {
    const thoughts = [];
    for (let i = 0; i < count; i++) {
      const thoughtText = getRandomArrItem(thoughtTexts);
      const username = getRandomArrItem(usernames);
      thoughts.push({ thoughtText, username });
    }
    return thoughts;
  };
  
  // Utility to generate random reactions
  export const getRandomReactions = (count: number, usernames: string[]) => {
    const reactions = [];
    for (let i = 0; i < count; i++) {
      const reactionBody = getRandomArrItem(reactionTexts);
      const username = getRandomArrItem(usernames);
      reactions.push({ reactionBody, username });
    }
    return reactions;
  };
  