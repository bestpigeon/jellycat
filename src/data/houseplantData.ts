export type BaseResult = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  buttonColor: string;
};

export const results: Record<string, BaseResult> = {
  monstera: {
    id: "monstera",
    name: "Monstera Deliciosa",
    description: "You love taking up space and making a statement! You thrive in bright, lively environments and aren't afraid to show off your unique personality.",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop",
    color: "bg-emerald-100 text-emerald-900",
    buttonColor: "bg-emerald-600",
  },
  pothos: {
    id: "pothos",
    name: "Golden Pothos",
    description: "You are incredibly resilient, adaptable, and easygoing. You can thrive in almost any situation and you're a supportive, low-maintenance friend.",
    imageUrl: "https://pcfb.gumlet.io/images/articles/golden-pothos-in-hanging-basket.png?w=640&h=426&mode=crop&crop=smart&s=50e6ea2942716506fe3ebf1096ab111b",
    color: "bg-lime-100 text-lime-900",
    buttonColor: "bg-lime-600",
  },
  succulent: {
    id: "succulent",
    name: "Succulent",
    description: "You are independent, self-sufficient, and enjoy your alone time. You don't need a lot of constant attention, but you are steadfast and reliable.",
    imageUrl: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=600&auto=format&fit=crop",
    color: "bg-teal-100 text-teal-900",
    buttonColor: "bg-teal-600",
  },
  calathea: {
    id: "calathea",
    name: "Calathea (Prayer Plant)",
    description: "You are sensitive, expressive, and deeply in tune with your environment. You have a strict routine and you let people know exactly how you're feeling.",
    imageUrl: "https://www.thetreecenter.com/c/uploads/2022/05/Calathea_Stock_image_1.webp",
    color: "bg-green-100 text-green-900",
    buttonColor: "bg-green-600",
  }
};

export const questions = [
  {
    id: 1,
    question: "How much social interaction do you need?",
    options: [
      { text: "I love being the center of attention at parties", pointsTo: ["monstera"] },
      { text: "I'm happy to just hang out wherever", pointsTo: ["pothos"] },
      { text: "I need a lot of alone time to recharge", pointsTo: ["succulent"] },
      { text: "I have a small, close-knit circle of friends", pointsTo: ["calathea"] },
    ],
  },
  {
    id: 2,
    question: "How do you react to a change of plans?",
    options: [
      { text: "I panic immediately and need time to adjust", pointsTo: ["calathea"] },
      { text: "I just roll with it, whatever happens happens", pointsTo: ["pothos"] },
      { text: "I'm totally fine as long as I can still relax", pointsTo: ["succulent"] },
      { text: "I try to find a way to make the new plan even bigger and better", pointsTo: ["monstera"] },
    ],
  },
  {
    id: 3,
    question: "What's your ideal living environment?",
    options: [
      { text: "A bright, sunny loft with big windows", pointsTo: ["monstera", "succulent"] },
      { text: "A cozy, dimly lit bedroom with lots of blankets", pointsTo: ["pothos", "calathea"] },
    ],
  },
  {
    id: 4,
    question: "How do you handle stress?",
    options: [
      { text: "I need a long bath and a strict self-care routine", pointsTo: ["calathea"] },
      { text: "I just keep pushing through, it's fine", pointsTo: ["pothos"] },
      { text: "I distance myself and withdraw", pointsTo: ["succulent"] },
      { text: "I vent and let it all out loudly", pointsTo: ["monstera"] },
    ],
  },
  {
    id: 5,
    question: "What's your personal style?",
    options: [
      { text: "Bold, trendy, and eye-catching", pointsTo: ["monstera"] },
      { text: "Minimalist, clean, and structured", pointsTo: ["succulent"] },
      { text: "Relaxed, comfortable, and easygoing", pointsTo: ["pothos"] },
      { text: "Highly curated and perfectly put-together", pointsTo: ["calathea"] },
    ],
  }
];
