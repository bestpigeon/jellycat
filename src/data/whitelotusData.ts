export type WhiteLotusResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, WhiteLotusResult> = {
  tanya: {
    id: "tanya",
    name: "Tanya McQuoid",
    description: "You are glamorous, deeply emotional, and chaotic. You have a big heart and a lot of baggage. You just want to have a beautiful day, find inner peace, and maybe ride on a Vespa.",
    imageUrl: "https://images.unsplash.com/photo-1580130006950-8b1b24e4d5fb?q=80&w=600&auto=format&fit=crop",
    color: "bg-fuchsia-100 text-fuchsia-800",
    buttonColor: "bg-fuchsia-600",
  },
  harper: {
    id: "harper",
    name: "Harper Spiller",
    description: "You are sharp, intellectual, and highly observational. You prefer reading the news to making small talk. People might think you're judgmental, but you just value authenticity over fake politeness.",
    imageUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=600&auto=format&fit=crop",
    color: "bg-slate-200 text-slate-800",
    buttonColor: "bg-slate-700",
  },
  shane: {
    id: "shane",
    name: "Shane Patton",
    description: "You know what you want and you expect to get it. You are detail-oriented (maybe to a fault) and cannot let go when you feel you've been wronged. You definitely want to speak to the manager.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    color: "bg-blue-100 text-blue-800",
    buttonColor: "bg-blue-600",
  },
  lucia: {
    id: "lucia",
    name: "Lucia",
    description: "You are the ultimate hustler. Fun, spontaneous, and charming, you know how to read a room and get exactly what you want out of people. You are just here for a good time (and a free shopping spree).",
    imageUrl: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop",
    color: "bg-rose-100 text-rose-800",
    buttonColor: "bg-rose-500",
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
    question: "You just arrived at a 5-star resort. First order of business?",
    options: [
      { text: "Head straight to the spa for a deeply emotional massage", pointsTo: ["tanya"] },
      { text: "Check if the room perfectly matches the photos online", pointsTo: ["shane"] },
      { text: "Sit by the pool and silently judge the other guests", pointsTo: ["harper"] },
      { text: "Order an expensive cocktail and charge it to someone else's room", pointsTo: ["lucia"] },
    ],
  },
  {
    id: 2,
    question: "How do you handle a minor inconvenience on vacation?",
    options: [
      { text: "Complain to the front desk every day until it's fixed", pointsTo: ["shane"] },
      { text: "Make a sarcastic comment to my partner and brood", pointsTo: ["harper"] },
      { text: "Have a minor existential breakdown", pointsTo: ["tanya"] },
      { text: "Pivot smoothly and find a way to turn it into an adventure", pointsTo: ["lucia"] },
    ],
  },
  {
    id: 3,
    question: "What's your packing strategy?",
    options: [
      { text: "Six massive suitcases of designer clothes", pointsTo: ["tanya"] },
      { text: "A sleek, organized carry-on with neutral colors", pointsTo: ["harper"] },
      { text: "Whatever looks good at the resort boutique—I'll just buy it there", pointsTo: ["lucia"] },
      { text: "Polo shirts and perfectly folded khakis", pointsTo: ["shane"] },
    ],
  },
  {
    id: 4,
    question: "Choose your ideal vacation dining experience:",
    options: [
      { text: "The most exclusive table, arguing over the bill", pointsTo: ["shane"] },
      { text: "Eating a giant plate of pasta after a wild night out", pointsTo: ["lucia"] },
      { text: "A moody dinner where I psychoanalyze my tablemates", pointsTo: ["harper"] },
      { text: "A scenic dinner where I overshare to a stranger", pointsTo: ["tanya"] },
    ],
  },
  {
    id: 5,
    question: "What's your ultimate life goal?",
    options: [
      { text: "To finally feel understood and unconditionally loved", pointsTo: ["tanya"] },
      { text: "To always get the respect and service I deserve", pointsTo: ["shane"] },
      { text: "To be intellectually stimulated and entirely unbothered", pointsTo: ["harper"] },
      { text: "To be rich, free, and answering to no one", pointsTo: ["lucia"] },
    ],
  },
];