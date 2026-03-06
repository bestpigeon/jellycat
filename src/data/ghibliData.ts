export type GhibliResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, GhibliResult> = {
  howl: {
    id: "howl",
    name: "Howl's Moving Castle",
    description: "You belong in a world of dramatic magic, flying castles, and chaotic found family. You value your freedom and have an excellent sense of style, even if your room is a bit messy.",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    color: "bg-sky-100 text-sky-900",
    buttonColor: "bg-sky-600",
  },
  totoro: {
    id: "totoro",
    name: "My Neighbor Totoro",
    description: "You have a pure, gentle soul. You belong in a lush, green countryside, playing in the rain, taking naps under giant trees, and finding the quiet magic in everyday life.",
    imageUrl: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=600&auto=format&fit=crop",
    color: "bg-emerald-100 text-emerald-900",
    buttonColor: "bg-emerald-600",
  },
  spirited: {
    id: "spirited",
    name: "Spirited Away",
    description: "You are brave, adaptable, and hardworking. You belong in a bustling, mystical bathhouse. You aren't afraid to roll up your sleeves to help others and you navigate complex situations with grace.",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=600&auto=format&fit=crop",
    color: "bg-red-100 text-red-900",
    buttonColor: "bg-red-600",
  },
  kiki: {
    id: "kiki",
    name: "Kiki's Delivery Service",
    description: "You are an independent spirit trying to find your place in the world. You belong in a coastal, European-inspired town with a bakery. You are hardworking, fiercely loyal, and sometimes push yourself a bit too hard.",
    imageUrl: "https://images.unsplash.com/photo-1555529733-0e67056058e1?q=80&w=600&auto=format&fit=crop",
    color: "bg-indigo-100 text-indigo-900",
    buttonColor: "bg-indigo-500",
  },
};

export type Option = {
  text: string;
  pointsTo: string[];
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Choose a meal to eat after a long journey:",
    options: [
      { text: "Bacon and eggs cooked over a talking fire", pointsTo: ["howl"] },
      { text: "A warm, comforting rice ball with a friend", pointsTo: ["spirited"] },
      { text: "Freshly baked bread and pastries", pointsTo: ["kiki"] },
      { text: "Fresh cucumber and sweet corn from the garden", pointsTo: ["totoro"] },
    ],
  },
  {
    id: 2,
    question: "What is your ideal mode of transportation?",
    options: [
      { text: "Flying on a magical broomstick", pointsTo: ["kiki"] },
      { text: "A giant, fluffy cat-bus", pointsTo: ["totoro"] },
      { text: "A steam train traveling over the ocean", pointsTo: ["spirited"] },
      { text: "A massive, walking steampunk castle", pointsTo: ["howl"] },
    ],
  },
  {
    id: 3,
    question: "Choose an animal companion:",
    options: [
      { text: "A cynical but loyal black cat", pointsTo: ["kiki"] },
      { text: "A mysterious, giant forest spirit", pointsTo: ["totoro"] },
      { text: "A small mouse who used to be a giant baby", pointsTo: ["spirited"] },
      { text: "An asthmatic dog", pointsTo: ["howl"] },
    ],
  },
  {
    id: 4,
    question: "Where do you go to clear your head?",
    options: [
      { text: "A secret, magical flower meadow", pointsTo: ["howl"] },
      { text: "Deep into a quiet, ancient forest", pointsTo: ["totoro"] },
      { text: "Sitting by the edge of the ocean", pointsTo: ["spirited", "kiki"] },
      { text: "My messy room to reorganize", pointsTo: ["howl", "kiki"] },
    ],
  },
  {
    id: 5,
    question: "What is your best trait?",
    options: [
      { text: "My unwavering loyalty to the people I love", pointsTo: ["spirited"] },
      { text: "My optimism and child-like wonder", pointsTo: ["totoro"] },
      { text: "My independence and work ethic", pointsTo: ["kiki"] },
      { text: "My flair for the dramatic and big heart", pointsTo: ["howl"] },
    ],
  },
];