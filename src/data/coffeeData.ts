export type CoffeeResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, CoffeeResult> = {
  black_coffee: {
    id: "black_coffee",
    name: "Black Coffee",
    description: "You are a purist. Straightforward, driven, and no-nonsense. You know exactly what you want and don't need any extra fluff to get things done. People admire your focus and reliability.",
    imageUrl: "https://media.istockphoto.com/id/174684628/photo/pouring-fresh-coffee.jpg?s=612x612&w=0&k=20&c=pXOkO9bhWVKA7s4JGtvz9aPMZzkF24noXPdXlMkTQ_A=",
    color: "bg-stone-100 text-stone-800",
    buttonColor: "bg-stone-800",
  },
  latte: {
    id: "latte",
    name: "Warm Latte",
    description: "You are the comforting friend. Balanced, approachable, and warm. You like things to be smooth and aesthetically pleasing. You bring harmony to your friend group and love a cozy aesthetic.",
    imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=600&auto=format&fit=crop",
    color: "bg-amber-100 text-amber-800",
    buttonColor: "bg-amber-600",
  },
  espresso: {
    id: "espresso",
    name: "Espresso Shot",
    description: "You are a powerhouse! Fast-paced, energetic, and intense. You pack a lot of personality into a small package and are always on the go. You're the one leading the charge on new projects.",
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop",
    color: "bg-orange-100 text-orange-800",
    buttonColor: "bg-orange-600",
  },
  iced_caramel: {
    id: "iced_caramel",
    name: "Iced Caramel Macchiato",
    description: "You are fun, trendy, and sweet! You love treating yourself and aren't afraid to be a little extra. You bring the party wherever you go and always know the best spots in town.",
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop",
    color: "bg-yellow-100 text-yellow-800",
    buttonColor: "bg-yellow-500",
  },
  matcha: {
    id: "matcha",
    name: "Matcha Latte",
    description: "You are zen, mindful, and unique. You prefer a gentle, sustained energy over a chaotic rush. You likely have a great skincare routine, love nature, and value your peace above all else.",
    imageUrl: "https://media.istockphoto.com/id/1325991061/photo/matcha-latte-green-milk-foam-cup-on-wood-table-at-cafe-trendy-powered-tea-trend-from-japan.jpg?s=612x612&w=0&k=20&c=a7cV9mdPwPj93BrxoFrJXEdA71RsOnXIOzVF90CYPsQ=",
    color: "bg-emerald-100 text-emerald-800",
    buttonColor: "bg-emerald-600",
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
    question: "How do you usually wake up in the morning?",
    options: [
      { text: "Jump out of bed, ready to tackle the day instantly", pointsTo: ["espresso", "black_coffee"] },
      { text: "Hit snooze at least twice before slowly rolling out", pointsTo: ["latte", "iced_caramel"] },
      { text: "Wake up naturally with the sunrise, maybe do some yoga", pointsTo: ["matcha"] },
      { text: "Check my phone for 20 minutes before moving", pointsTo: ["iced_caramel", "latte"] },
    ],
  },
  {
    id: 2,
    question: "What's your ideal vacation destination?",
    options: [
      { text: "A bustling city with endless things to do and see", pointsTo: ["espresso", "iced_caramel"] },
      { text: "A cozy cabin in the woods with a good book", pointsTo: ["black_coffee", "latte"] },
      { text: "A wellness retreat in the mountains", pointsTo: ["matcha"] },
      { text: "A sunny beach resort with pool service", pointsTo: ["iced_caramel", "latte"] },
    ],
  },
  {
    id: 3,
    question: "How do you handle a busy workday?",
    options: [
      { text: "Headphones on, tunnel vision, get it done", pointsTo: ["black_coffee", "espresso"] },
      { text: "Make a beautifully color-coded to-do list first", pointsTo: ["matcha", "latte"] },
      { text: "Chat with coworkers to break up the stress", pointsTo: ["iced_caramel", "latte"] },
      { text: "Power through it as fast as humanly possible", pointsTo: ["espresso"] },
    ],
  },
  {
    id: 4,
    question: "Pick a sweet treat to go with your drink:",
    options: [
      { text: "A classic, buttery croissant", pointsTo: ["latte", "black_coffee"] },
      { text: "A decadent chocolate brownie", pointsTo: ["espresso", "iced_caramel"] },
      { text: "A light fruit tart or avocado toast", pointsTo: ["matcha"] },
      { text: "A colorful macaron or cake pop", pointsTo: ["iced_caramel"] },
    ],
  },
  {
    id: 5,
    question: "How would your friends describe your style?",
    options: [
      { text: "Minimalist, lots of neutrals and black", pointsTo: ["black_coffee", "espresso"] },
      { text: "Cozy, comfortable, lots of soft sweaters", pointsTo: ["latte"] },
      { text: "Trendy, colorful, always put together", pointsTo: ["iced_caramel"] },
      { text: "Earthy, relaxed, maybe a bit bohemian", pointsTo: ["matcha"] },
    ],
  },
];
