export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  cinderella: {
    id: "cinderella",
    name: "Cinderella",
    description: "You are endlessly optimistic, kind-hearted, and hardworking. You believe that dreams really do come true, and you never let hard times turn you bitter.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    color: "bg-blue-100 text-blue-900",
    buttonColor: "bg-blue-500",
  },
  mulan: {
    id: "mulan",
    name: "Mulan",
    description: "You are brave, fiercely protective of your family, and willing to break the rules for what is right. You are a warrior at heart.",
    imageUrl: "https://images.unsplash.com/photo-1582294157519-5d3c11d290fa?q=80&w=600&auto=format&fit=crop",
    color: "bg-red-100 text-red-900",
    buttonColor: "bg-red-600",
  },
  ariel: {
    id: "ariel",
    name: "Ariel",
    description: "You are deeply curious, adventurous, and always dreaming of exploring new worlds. You are a collector of treasures and love breaking out of your comfort zone.",
    imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop",
    color: "bg-teal-100 text-teal-900",
    buttonColor: "bg-teal-500",
  },
  tiana: {
    id: "tiana",
    name: "Tiana",
    description: "You are ambitious, practical, and know that hard work is the only way to get what you want. You have a clear vision for your future.",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
    color: "bg-green-100 text-green-900",
    buttonColor: "bg-green-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "What is your biggest flaw?",
    options: [
      { text: "I can be too naive and trusting", pointsTo: ["cinderella"] },
      { text: "I'm too rebellious and act before thinking", pointsTo: ["ariel", "mulan"] },
      { text: "I work too hard and forget to have fun", pointsTo: ["tiana"] },
    ],
  },
  {
    id: 2,
    question: "Choose a companion:",
    options: [
      { text: "Helpful mice and birds", pointsTo: ["cinderella"] },
      { text: "A tiny, sassy dragon", pointsTo: ["mulan"] },
      { text: "A neurotic crab", pointsTo: ["ariel"] },
      { text: "A trumpet-playing alligator", pointsTo: ["tiana"] },
    ],
  },
  {
    id: 3,
    question: "What's your dream activity?",
    options: [
      { text: "Going to a grand, glamorous party", pointsTo: ["cinderella"] },
      { text: "Traveling the world and collecting souvenirs", pointsTo: ["ariel"] },
      { text: "Opening my own successful business", pointsTo: ["tiana"] },
      { text: "Proving everyone who doubted me wrong", pointsTo: ["mulan"] },
    ],
  }
];
