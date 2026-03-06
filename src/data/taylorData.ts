export type TaylorResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, TaylorResult> = {
  folklore: {
    id: "folklore",
    name: "The Folklore Era",
    description: "You are a poetic soul who finds beauty in the quiet moments. You probably own too many cardigans, love the rain, and give the best, most thoughtful advice to your friends.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
    color: "bg-stone-100 text-stone-800",
    buttonColor: "bg-stone-600",
  },
  reputation: {
    id: "reputation",
    name: "The Reputation Era",
    description: "Fiercely loyal, fiercely independent, and slightly misunderstood. You’ve had your 'death of a reputation' moment and came back stronger. You protect your peace and your people at all costs.",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    color: "bg-neutral-900 text-white",
    buttonColor: "bg-neutral-700",
  },
  pop_1989: {
    id: "pop_1989",
    name: "The 1989 Era",
    description: "You are the life of the party! Independent, stylish, and always moving onto the next big thing. You romanticize city life, love a polaroid picture, and have a devastatingly good haircut.",
    imageUrl: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=600&auto=format&fit=crop",
    color: "bg-sky-100 text-sky-800",
    buttonColor: "bg-sky-500",
  },
  lover: {
    id: "lover",
    name: "The Lover Era",
    description: "You are a hopeless romantic wearing rose-colored glasses. You love pastel colors, making your house a home, and you believe in true love. You leave a trail of glitter wherever you go.",
    imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop",
    color: "bg-pink-100 text-pink-800",
    buttonColor: "bg-pink-400",
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
    question: "It's Friday night. What's the plan?",
    options: [
      { text: "Reading a book wrapped in a cozy blanket", pointsTo: ["folklore"] },
      { text: "Getting dressed up for a night out in the city", pointsTo: ["pop_1989", "reputation"] },
      { text: "Hosting a game night with my favorite people", pointsTo: ["lover"] },
      { text: "Plotting a minor revenge", pointsTo: ["reputation"] },
    ],
  },
  {
    id: 2,
    question: "Pick a lyrical aesthetic:",
    options: [
      { text: "Sunlight, paper rings, and hazy pink skies", pointsTo: ["lover"] },
      { text: "Snake bites, dark lipstick, and city lights", pointsTo: ["reputation"] },
      { text: "Cobblestones, old cardigans, and weeping willows", pointsTo: ["folklore"] },
      { text: "Polaroids, red lips, and a new haircut", pointsTo: ["pop_1989"] },
    ],
  },
  {
    id: 3,
    question: "How do you handle a breakup or falling out?",
    options: [
      { text: "I reinvent myself completely and glow up", pointsTo: ["pop_1989"] },
      { text: "I cut them off without a second thought", pointsTo: ["reputation"] },
      { text: "I write poetry about it and go for a walk in the woods", pointsTo: ["folklore"] },
      { text: "I cry, process my feelings, and try to stay friends", pointsTo: ["lover"] },
    ],
  },
  {
    id: 4,
    question: "Choose a fashion staple:",
    options: [
      { text: "An oversized vintage sweater", pointsTo: ["folklore"] },
      { text: "A sequin skirt or bright matching set", pointsTo: ["pop_1989"] },
      { text: "A pastel dress or heart-shaped accessories", pointsTo: ["lover"] },
      { text: "A black leather jacket", pointsTo: ["reputation"] },
    ],
  },
  {
    id: 5,
    question: "What is your biggest red flag?",
    options: [
      { text: "I fall in love entirely too fast", pointsTo: ["lover"] },
      { text: "I hold a grudge until the end of time", pointsTo: ["reputation"] },
      { text: "I run away from commitment when things get serious", pointsTo: ["pop_1989"] },
      { text: "I isolate myself when I'm feeling sad", pointsTo: ["folklore"] },
    ],
  },
];