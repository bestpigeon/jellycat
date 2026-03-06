export type AuraResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, AuraResult> = {
  red: {
    id: "red",
    name: "Radiant Red",
    description: "You are a powerhouse of energy! Passionate, action-oriented, and fiercely independent. You tackle life head-on and aren't afraid to take risks. People are drawn to your natural confidence and magnetic presence.",
    imageUrl: "https://images.unsplash.com/photo-1595757816291-ab4c1cba0fc2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Abstract red liquid/gradient
    color: "bg-red-100 text-red-800",
    buttonColor: "bg-red-600",
  },
  blue: {
    id: "blue",
    name: "Tranquil Blue",
    description: "You are the calm in the storm. Empathetic, communicative, and deeply caring. You value honesty and deep connections over superficial small talk. Friends know they can always come to you for excellent advice and a listening ear.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1666733798974-d9d4b106340e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Abstract blue waves
    color: "bg-blue-100 text-blue-800",
    buttonColor: "bg-blue-600",
  },
  yellow: {
    id: "yellow",
    name: "Sunny Yellow",
    description: "You are pure joy! Optimistic, playful, and wonderfully creative. You light up every room you walk into and have a knack for finding the silver lining in any situation. Your enthusiasm is highly contagious.",
    imageUrl: "https://images.unsplash.com/photo-1571456653714-a8db063a3e91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eWVsbG93fGVufDB8fDB8fHww", // Abstract yellow/orange gradient
    color: "bg-yellow-100 text-yellow-800",
    buttonColor: "bg-yellow-500",
  },
  green: {
    id: "green",
    name: "Grounded Green",
    description: "You are balanced, nurturing, and deeply connected to the world around you. You prefer steady growth and harmonious environments over chaos. You likely have a green thumb and love creating safe, welcoming spaces for others.",
    imageUrl: "https://images.unsplash.com/photo-1553307236-8783cc0a3b9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW58ZW58MHx8MHx8fDA%3D", // Abstract green texture
    color: "bg-emerald-100 text-emerald-800",
    buttonColor: "bg-emerald-600",
  },
  purple: {
    id: "purple",
    name: "Mystic Purple",
    description: "You are highly intuitive, imaginative, and a little bit mysterious. You have a rich inner life and are drawn to the deeper, more philosophical aspects of the world. You march to the beat of your own drum.",
    imageUrl: "https://images.unsplash.com/photo-1621246159024-e53b1d25fc1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHB1cnBsZXxlbnwwfHwwfHx8MA%3D%3D", // Abstract purple fluid
    color: "bg-purple-100 text-purple-800",
    buttonColor: "bg-purple-600",
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
    question: "How do you prefer to recharge your batteries?",
    options: [
      { text: "Doing something active like going for a run or a loud concert", pointsTo: ["red", "yellow"] },
      { text: "Having a long, deep conversation with a close friend", pointsTo: ["blue", "green"] },
      { text: "Spending time alone in nature", pointsTo: ["green", "purple"] },
      { text: "Doing something creative like painting or writing", pointsTo: ["purple", "yellow"] },
    ],
  },
  {
    id: 2,
    question: "What's your typical role in your friend group?",
    options: [
      { text: "The instigator who plans all the fun activities", pointsTo: ["red", "yellow"] },
      { text: "The 'mom' who makes sure everyone is safe and fed", pointsTo: ["green", "blue"] },
      { text: "The therapist who listens to everyone's problems", pointsTo: ["blue", "purple"] },
      { text: "The life of the party who keeps everyone laughing", pointsTo: ["yellow", "red"] },
    ],
  },
  {
    id: 3,
    question: "If you had a totally free Saturday, what would you do?",
    options: [
      { text: "Wander around an art museum or thrift store", pointsTo: ["purple", "blue"] },
      { text: "Go hiking or check out a new botanical garden", pointsTo: ["green"] },
      { text: "Spontaneous road trip—wherever the wind takes me!", pointsTo: ["red", "yellow"] },
      { text: "Host a brunch or dinner party for my favorite people", pointsTo: ["yellow", "blue"] },
    ],
  },
  {
    id: 4,
    question: "How do you usually handle conflict?",
    options: [
      { text: "Address it head-on immediately, no sugar-coating", pointsTo: ["red"] },
      { text: "Talk it out calmly and try to understand their side", pointsTo: ["blue", "green"] },
      { text: "Use humor to diffuse the tension", pointsTo: ["yellow"] },
      { text: "Withdraw for a bit to process my feelings before speaking", pointsTo: ["purple", "green"] },
    ],
  },
  {
    id: 5,
    question: "Pick an item to decorate your bedroom with:",
    options: [
      { text: "A massive, thriving Monstera plant", pointsTo: ["green", "yellow"] },
      { text: "Crystals, incense, and warm fairy lights", pointsTo: ["purple", "blue"] },
      { text: "A bright, bold piece of modern art", pointsTo: ["red", "yellow"] },
      { text: "A ridiculously soft, oversized blanket", pointsTo: ["blue", "green"] },
    ],
  },
];