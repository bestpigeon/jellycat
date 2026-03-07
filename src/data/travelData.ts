export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  japan: {
    id: "japan",
    name: "Kyoto, Japan",
    description: "You appreciate peace, tradition, and quiet beauty. You'd love spending your days visiting temples, drinking matcha, and walking through bamboo forests.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    color: "bg-rose-100 text-rose-900",
    buttonColor: "bg-rose-600",
  },
  italy: {
    id: "italy",
    name: "Amalfi Coast, Italy",
    description: "You love romance, indulgence, and vibrant energy. You want to eat fresh pasta overlooking the ocean, sip wine at sunset, and live 'la dolce vita'.",
    imageUrl: "https://images.unsplash.com/photo-1533091090875-1ff4cc497bfa?q=80&w=600&auto=format&fit=crop",
    color: "bg-sky-100 text-sky-900",
    buttonColor: "bg-sky-500",
  },
  iceland: {
    id: "iceland",
    name: "Reykjavik, Iceland",
    description: "You are an adventurer seeking awe-inspiring landscapes. You want to see the northern lights, soak in geothermal pools, and explore icy dramatic terrains.",
    imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600&auto=format&fit=crop",
    color: "bg-slate-200 text-slate-900",
    buttonColor: "bg-slate-700",
  },
  cabin: {
    id: "cabin",
    name: "A Cabin in the Swiss Alps",
    description: "You just want to escape the noise. A cozy cabin with a roaring fire, a cup of hot cocoa, and snow falling outside the window is your ultimate paradise.",
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
    color: "bg-stone-200 text-stone-900",
    buttonColor: "bg-stone-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "Pick a vacation activity:",
    options: [
      { text: "Eating at a world-renowned restaurant", pointsTo: ["italy", "japan"] },
      { text: "Hiking a glacier or volcano", pointsTo: ["iceland"] },
      { text: "Reading a book by the fire", pointsTo: ["cabin"] },
      { text: "Visiting ancient historical sites", pointsTo: ["japan", "italy"] },
    ],
  },
  {
    id: 2,
    question: "What kind of weather do you prefer?",
    options: [
      { text: "Warm and sunny, perfect for the beach", pointsTo: ["italy"] },
      { text: "Crisp, cool, and a little misty", pointsTo: ["japan"] },
      { text: "Freezing cold and snowy", pointsTo: ["iceland", "cabin"] },
    ],
  },
  {
    id: 3,
    question: "How much planning do you do?",
    options: [
      { text: "Every minute is scheduled on a spreadsheet", pointsTo: ["japan", "iceland"] },
      { text: "I just show up and see where the day takes me", pointsTo: ["italy"] },
      { text: "I plan to do absolutely nothing.", pointsTo: ["cabin"] },
    ],
  }
];
