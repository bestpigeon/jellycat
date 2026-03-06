export type JellycatResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
  link: string;
};

export const results: Record<string, JellycatResult> = {
  amphibians: {
    id: "amphibians",
    name: "Amphibians & Reptiles",
    description: "A little quirky, incredibly unique, and comfortable in your own skin. You appreciate your alone time, cozy rainy days, and aren't afraid to stand out from the crowd.",
    imageUrl: "https://m.media-amazon.com/images/I/71mr0x7c02L._AC_SL1500_.jpg",
    color: "bg-green-100 text-green-800",
    buttonColor: "bg-green-600",
    link: "https://us.jellycat.com/animals/amphibians-reptiles",
  },
  birds: {
    id: "birds",
    name: "Birds",
    description: "Free-spirited, observant, and always ready to take flight on a new adventure. You love seeing the world from a different perspective and value your independence.",
    imageUrl: "https://m.media-amazon.com/images/I/516C5thuiQL._AC_SL1000_.jpg",
    color: "bg-sky-100 text-sky-800",
    buttonColor: "bg-sky-600",
    link: "https://us.jellycat.com/animals/birds",
  },
  bugs: {
    id: "bugs",
    name: "Bugs & Insects",
    description: "Small but mighty! You are detail-oriented, hardworking, and find beauty in the little things that others might overlook. You bring a flutter of joy wherever you go.",
    imageUrl: "https://m.media-amazon.com/images/I/71ev8mkoWLL._AC_SL1500_.jpg",
    color: "bg-pink-100 text-pink-800",
    buttonColor: "bg-pink-600",
    link: "https://us.jellycat.com/animals/bugs-insects",
  },
  cats: {
    id: "cats",
    name: "Cats & Kittens",
    description: "Elegant, independent, and just a little bit sassy. You know what you want and aren't afraid to ask for it, but you also have a soft, affectionate side for those you trust.",
    imageUrl: "https://m.media-amazon.com/images/I/811ppPMTpML._AC_SL1500_.jpg",
    color: "bg-purple-100 text-purple-800",
    buttonColor: "bg-purple-600",
    link: "https://us.jellycat.com/animals/cats-kittens",
  },
  dinosaurs: {
    id: "dinosaurs",
    name: "Dinosaurs",
    description: "Bold, energetic, and a little bit prehistoric! You have a big personality, love making a statement, and are fiercely protective of your friends and family.",
    imageUrl: "https://m.media-amazon.com/images/I/61WaV5CvCLL._AC_SL1500_.jpg",
    color: "bg-emerald-100 text-emerald-800",
    buttonColor: "bg-emerald-600",
    link: "https://us.jellycat.com/animals/dragons-dinosaurs",
  },
  dogs: {
    id: "dogs",
    name: "Dogs & Puppies",
    description: "Loyal, playful, and always happy to see your loved ones. You are the ultimate best friend, bringing boundless energy and unconditional love to every situation.",
    imageUrl: "https://m.media-amazon.com/images/I/71Tzo6bT8bL._AC_SL1500_.jpg",
    color: "bg-amber-100 text-amber-800",
    buttonColor: "bg-amber-600",
    link: "https://us.jellycat.com/animals/dogs-puppies",
  },
  farmyard: {
    id: "farmyard",
    name: "Farmyard",
    description: "Down-to-earth, reliable, and deeply connected to your roots. You enjoy the simple pleasures in life, value hard work, and love a good, hearty meal with friends.",
    imageUrl: "https://m.media-amazon.com/images/I/41nTM60ohnL._AC_SL1000_.jpg",
    color: "bg-red-100 text-red-800",
    buttonColor: "bg-red-600",
    link: "https://us.jellycat.com/animals/farmyard",
  },
  jungle: {
    id: "jungle",
    name: "Jungle & Safari",
    description: "Wild, adventurous, and always seeking the next thrill. You thrive in vibrant environments, love exploring the unknown, and have a naturally charismatic presence.",
    imageUrl: "https://m.media-amazon.com/images/I/71XxJ+82AoL._AC_SL1500_.jpg",
    color: "bg-yellow-100 text-yellow-800",
    buttonColor: "bg-yellow-600",
    link: "https://us.jellycat.com/animals/jungle-safari",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "Deep, mysterious, and incredibly adaptable. You go with the flow, have a calming presence, and possess hidden depths that only a few get to truly explore.",
    imageUrl: "https://m.media-amazon.com/images/I/71wSjSjBuSL._AC_SL1500_.jpg",
    color: "bg-blue-100 text-blue-800",
    buttonColor: "bg-blue-600",
    link: "https://us.jellycat.com/animals/ocean",
  },
  bunnies: {
    id: "bunnies",
    name: "Bunnies",
    description: "Sweet, classic, and always there for a hug. You value comfort, deep friendships, and quiet moments. You are a loyal friend who loves to make others feel safe.",
    imageUrl: "https://m.media-amazon.com/images/I/71QOusOFy7L._AC_SL1500_.jpg",
    color: "bg-rose-100 text-rose-800",
    buttonColor: "bg-rose-600",
    link: "https://us.jellycat.com/animals/bunnies",
  },
  bear: {
    id: "bear",
    name: "Bear",
    description: "Sleepy, cozy, and deeply in tune with nature. You take life at your own pace, love comfort food, and give the absolute best, most reassuring hugs.",
    imageUrl: "https://m.media-amazon.com/images/I/71cvp+ZIBCL._AC_SL1500_.jpg",
    color: "bg-orange-100 text-orange-800",
    buttonColor: "bg-orange-600",
    link: "https://us.jellycat.com/animals/bears",
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
    question: "What does your ideal weekend look like?",
    options: [
      { text: "Curled up at home with a good book and tea", pointsTo: ["cats", "bunnies", "bear"] },
      { text: "Exploring a new hiking trail or park", pointsTo: ["jungle", "dinosaurs", "birds"] },
      { text: "Hanging out at a cozy cafe with friends", pointsTo: ["dogs", "farmyard"] },
      { text: "Going to the beach or an aquarium", pointsTo: ["ocean", "amphibians"] },
      { text: "Tending to my garden or houseplants", pointsTo: ["bugs", "bear"] },
    ],
  },
  {
    id: 2,
    question: "How do you usually handle stress?",
    options: [
      { text: "I need to talk it out with my best friend", pointsTo: ["dogs", "bunnies"] },
      { text: "I retreat to my room and need alone time", pointsTo: ["cats", "amphibians", "bugs"] },
      { text: "I try to find a practical solution immediately", pointsTo: ["farmyard", "dinosaurs"] },
      { text: "I go for a walk or exercise to clear my head", pointsTo: ["jungle", "birds"] },
      { text: "I take a long bath or shower to relax", pointsTo: ["ocean", "bear"] },
    ],
  },
  {
    id: 3,
    question: "Pick a color palette that speaks to you:",
    options: [
      { text: "Earthy greens and browns", pointsTo: ["bear", "amphibians", "dinosaurs"] },
      { text: "Deep ocean blues and teals", pointsTo: ["ocean", "birds"] },
      { text: "Warm sunny yellows and oranges", pointsTo: ["jungle", "farmyard", "dogs"] },
      { text: "Soft pastel pinks and purples", pointsTo: ["bugs", "bunnies", "cats"] },
    ],
  },
  {
    id: 4,
    question: "What's your role in your friend group?",
    options: [
      { text: "The Mom/Dad - always making sure everyone is okay", pointsTo: ["farmyard", "dogs", "bunnies"] },
      { text: "The Adventurer - always suggesting crazy new plans", pointsTo: ["jungle", "dinosaurs", "birds"] },
      { text: "The Listener - giving the best advice", pointsTo: ["ocean", "bear"] },
      { text: "The Observer - quiet but notices everything", pointsTo: ["cats", "amphibians", "bugs"] },
    ],
  },
  {
    id: 5,
    question: "What's your favorite time of day?",
    options: [
      { text: "Early morning - I love the quiet before the world wakes up", pointsTo: ["birds", "farmyard", "bear"] },
      { text: "The middle of the day - I'm most active when it's bright", pointsTo: ["dogs", "jungle"] },
      { text: "Golden hour - everything looks magical and warm", pointsTo: ["cats", "bunnies", "dinosaurs"] },
      { text: "Late at night - I'm a total night owl", pointsTo: ["ocean", "amphibians", "bugs"] },
    ],
  },
];
