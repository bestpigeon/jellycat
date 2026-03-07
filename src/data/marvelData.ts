export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  cap: {
    id: "cap",
    name: "Captain America",
    description: "You are a natural leader with a strong moral compass. You always try to do the right thing, even when it's the hardest choice.",
    imageUrl: "https://images.unsplash.com/photo-1559580456-e9b6a9c1488c?q=80&w=600&auto=format&fit=crop",
    color: "bg-blue-100 text-blue-900",
    buttonColor: "bg-blue-600",
  },
  tony: {
    id: "tony",
    name: "Iron Man",
    description: "You are a brilliant, witty problem-solver who sometimes hides behind sarcasm. You love technology, luxury, and being in control.",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    color: "bg-red-100 text-red-900",
    buttonColor: "bg-red-600",
  },
  widow: {
    id: "widow",
    name: "Black Widow",
    description: "You are mysterious, highly competent, and extremely loyal to your chosen family. You observe everything and speak only when necessary.",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=600&auto=format&fit=crop",
    color: "bg-slate-800 text-slate-100",
    buttonColor: "bg-black",
  },
  thor: {
    id: "thor",
    name: "Thor",
    description: "You are boisterous, dramatic, and have a massive heart. You love a good feast, a good fight, and you value honor above all.",
    imageUrl: "https://images.unsplash.com/photo-1598305015383-b9247ebce90e?q=80&w=600&auto=format&fit=crop",
    color: "bg-yellow-100 text-yellow-900",
    buttonColor: "bg-yellow-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "How do you handle a conflict?",
    options: [
      { text: "Try to negotiate a peaceful resolution", pointsTo: ["cap"] },
      { text: "Outsmart them with my genius intellect", pointsTo: ["tony"] },
      { text: "Strike first, ask questions later", pointsTo: ["widow"] },
      { text: "Challenge them to a glorious duel!", pointsTo: ["thor"] },
    ],
  },
  {
    id: 2,
    question: "What's your Saturday night plan?",
    options: [
      { text: "Tinkering in the garage with a new project", pointsTo: ["tony"] },
      { text: "A quiet night in, watching a classic movie", pointsTo: ["cap"] },
      { text: "Hitting the club and being the life of the party", pointsTo: ["thor"] },
      { text: "People-watching at a low-key bar", pointsTo: ["widow"] },
    ],
  },
  {
    id: 3,
    question: "What motivates you?",
    options: [
      { text: "Doing what is right and just", pointsTo: ["cap"] },
      { text: "Protecting my found family", pointsTo: ["widow"] },
      { text: "Proving my worth and building a legacy", pointsTo: ["tony"] },
      { text: "Honor, glory, and protecting my realm", pointsTo: ["thor"] },
    ],
  },
  {
    id: 4,
    question: "What's your hidden talent?",
    options: [
      { text: "Strategic thinking and long-term planning", pointsTo: ["cap"] },
      { text: "Engineering or fixing complicated things", pointsTo: ["tony"] },
      { text: "Reading people and situations instantly", pointsTo: ["widow"] },
      { text: "Inspiring others with sheer charisma", pointsTo: ["thor"] },
    ],
  },
  {
    id: 5,
    question: "What do you value most in a team?",
    options: [
      { text: "Absolute loyalty and mutual trust", pointsTo: ["cap"] },
      { text: "Quiet competence and getting the job done", pointsTo: ["widow"] },
      { text: "Innovation and pushing the boundaries", pointsTo: ["tony"] },
      { text: "Camaraderie and shared glory", pointsTo: ["thor"] },
    ],
  }
];
