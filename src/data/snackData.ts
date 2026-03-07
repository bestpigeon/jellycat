export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  chips: {
    id: "chips",
    name: "Potato Chips",
    description: "You are classic, reliable, and a little bit salty. Everyone loves having you around, and once they start talking to you, they can't stop.",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-e924e50cb0ee?q=80&w=600&auto=format&fit=crop",
    color: "bg-yellow-100 text-yellow-900",
    buttonColor: "bg-yellow-500",
  },
  chocolate: {
    id: "chocolate",
    name: "Dark Chocolate",
    description: "You are rich, complex, and sophisticated. You can be a little intense for some people, but those who appreciate you absolutely adore you.",
    imageUrl: "https://images.unsplash.com/photo-1548813955-4672bb7e6d0a?q=80&w=600&auto=format&fit=crop",
    color: "bg-stone-800 text-stone-100",
    buttonColor: "bg-stone-900",
  },
  gummy: {
    id: "gummy",
    name: "Gummy Bears",
    description: "You are colorful, bouncy, and full of youthful energy! You bring joy and sweetness to every situation and never take yourself too seriously.",
    imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?q=80&w=600&auto=format&fit=crop",
    color: "bg-pink-100 text-pink-900",
    buttonColor: "bg-pink-500",
  },
  popcorn: {
    id: "popcorn",
    name: "Movie Theater Popcorn",
    description: "You are the ultimate companion for a cozy night in. You love drama (on screen), hanging out with friends, and being comfortable.",
    imageUrl: "https://images.unsplash.com/photo-1572177191856-3cbde61807f4?q=80&w=600&auto=format&fit=crop",
    color: "bg-red-100 text-red-900",
    buttonColor: "bg-red-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "What's your general vibe?",
    options: [
      { text: "Sweet and upbeat", pointsTo: ["gummy"] },
      { text: "Salty and sarcastic", pointsTo: ["chips"] },
      { text: "Deep and thoughtful", pointsTo: ["chocolate"] },
      { text: "Chill and cozy", pointsTo: ["popcorn"] },
    ],
  },
  {
    id: 2,
    question: "Pick a movie genre:",
    options: [
      { text: "A tense psychological thriller", pointsTo: ["chocolate"] },
      { text: "A loud, action-packed blockbuster", pointsTo: ["popcorn", "chips"] },
      { text: "A colorful animated musical", pointsTo: ["gummy"] },
    ],
  },
  {
    id: 3,
    question: "How do you handle a long road trip?",
    options: [
      { text: "I'm the DJ playing all the fun hits", pointsTo: ["gummy"] },
      { text: "I'm asleep in the passenger seat", pointsTo: ["popcorn"] },
      { text: "I'm driving and silently judging everyone's music taste", pointsTo: ["chocolate"] },
      { text: "I brought all the snacks and keep everyone entertained", pointsTo: ["chips"] },
    ],
  },
  {
    id: 4,
    question: "How do you feel about sharing?",
    options: [
      { text: "I'll share, but I'm keeping the best pieces", pointsTo: ["gummy"] },
      { text: "What's mine is yours, let's pass the bowl around", pointsTo: ["chips", "popcorn"] },
      { text: "Absolutely not. Get your own.", pointsTo: ["chocolate"] },
    ],
  },
  {
    id: 5,
    question: "Choose a beverage to go with it:",
    options: [
      { text: "An ice-cold, fizzy soda", pointsTo: ["popcorn", "chips"] },
      { text: "A rich, dark cup of coffee or red wine", pointsTo: ["chocolate"] },
      { text: "A fruity, colorful juice or tea", pointsTo: ["gummy"] },
    ],
  }
];
