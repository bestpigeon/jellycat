export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  jisoo: {
    id: "jisoo",
    name: "Jisoo",
    description: "You are the elegant, witty, and caring backbone of your group. You have a unique '4D' personality and a sharp sense of humor. You're classic, reliable, and effortlessly beautiful.",
    imageUrl: "https://i.pinimg.com/736x/ba/18/53/ba18535738b5b216aedaebff183b29d7.jpg",
    color: "bg-purple-100 text-purple-900",
    buttonColor: "bg-purple-600",
  },
  jennie: {
    id: "jennie",
    name: "Jennie",
    description: "You are fierce and powerful on the outside, but sweet and warm on the inside. You have an incredible sense of style and are a natural leader who isn't afraid to take center stage.",
    imageUrl: "https://www.designscene.net/wp-content/uploads/2026/01/Chanel-Coco-Crush-2026-Jennie-1.webp",
    color: "bg-rose-100 text-rose-900",
    buttonColor: "bg-rose-600",
  },
  rose: {
    id: "rose",
    name: "Rosé",
    description: "You are artistic, soulful, and deeply emotional. You're adventurous and always willing to try new things, but you find your true strength in your passion and your unique voice.",
    imageUrl: "https://cdn.apollo.audio/one/media/6748/a213/40b2/4405/a2ef/777f/Rose.jpg?quality=80&format=jpg&width=960&ratio=16-9",
    color: "bg-pink-100 text-pink-900",
    buttonColor: "bg-pink-500",
  },
  lisa: {
    id: "lisa",
    name: "Lisa",
    description: "You are the life of the party! Energetic, charismatic, and incredibly dedicated to your craft. You have a cool, edgy vibe and you're always there to lift everyone's spirits.",
    imageUrl: "https://fashionmagazine.mblycdn.com/fm/resized/2025/04/w2400/HORIZONTAL-FEATURE-IMAGE-TEMPLATE-6.png",
    color: "bg-yellow-100 text-yellow-900",
    buttonColor: "bg-yellow-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "What's your go-to fashion vibe?",
    options: [
      { text: "Classic and elegant", pointsTo: ["jisoo"] },
      { text: "High fashion and edgy", pointsTo: ["jennie"] },
      { text: "Soft, bohemian and musical", pointsTo: ["rose"] },
      { text: "Streetwear and bold colors", pointsTo: ["lisa"] },
    ],
  },
  {
    id: 2,
    question: "How do you spend your free day?",
    options: [
      { text: "Playing video games or reading", pointsTo: ["jisoo"] },
      { text: "Hanging out with my pet or shopping", pointsTo: ["jennie"] },
      { text: "Practicing an instrument or painting", pointsTo: ["rose"] },
      { text: "Dancing or hanging out with friends", pointsTo: ["lisa"] },
    ],
  },
  {
    id: 3,
    question: "Pick a stage color:",
    options: [
      { text: "Sophisticated Royal Blue", pointsTo: ["jisoo"] },
      { text: "Power Black", pointsTo: ["jennie"] },
      { text: "Sweet Rose Gold", pointsTo: ["rose"] },
      { text: "Neon Yellow or Green", pointsTo: ["lisa"] },
    ],
  },
  {
    id: 4,
    question: "What's your role in your friend group?",
    options: [
      { text: "The funny one who keeps the mood light", pointsTo: ["jisoo"] },
      { text: "The trendsetter everyone asks for advice", pointsTo: ["jennie"] },
      { text: "The emotional supporter and listener", pointsTo: ["rose"] },
      { text: "The high-energy one ready for adventure", pointsTo: ["lisa"] },
    ],
  },
  {
    id: 5,
    question: "Which pet would you want?",
    options: [
      { text: "A fluffy, loyal dog", pointsTo: ["jisoo", "jennie"] },
      { text: "A sophisticated cat", pointsTo: ["lisa", "jennie"] },
      { text: "Something unique, like a fish or bird", pointsTo: ["rose"] },
    ],
  }
];
