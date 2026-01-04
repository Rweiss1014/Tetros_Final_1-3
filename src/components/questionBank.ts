// Question bank for the educational Tetris game
// Questions are organized by difficulty level

export interface Question {
  id: string;
  question: string;
  scenario?: string; // Optional scenario/context for the question
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  category: string;
  difficulty: number; // 1-10, scales with game level
  explanation?: string;
}

// Sample question bank - customize these for your educational needs
export const QUESTION_BANK: Question[] = [
  // Level 1-2 Questions (Easy)
  {
    id: "cs_1",
    question: "What is the BEST first step to take?",
    scenario: "A customer calls saying they received the wrong item in their order. They seem frustrated and mention they needed it for an event tomorrow.",
    options: [
      "Immediately offer a full refund without checking the order.",
      "Apologize for the error and verify the order details with them.",
      "Tell them to return the item before any action can be taken.",
      "Transfer the call to a supervisor right away."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 1,
    explanation: "Always verify order details first to understand the situation fully and show the customer you're taking their concern seriously."
  },
  {
    id: "cs_2",
    question: "What is the BEST approach?",
    scenario: "A customer is asking about a product feature that you're not completely sure about. The customer seems in a hurry.",
    options: [
      "Make your best guess so they don't have to wait.",
      "Tell them you'll find out and call them back with accurate information.",
      "Redirect them to check the website themselves.",
      "Transfer them to multiple departments until someone knows."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 1,
    explanation: "It's better to take time to provide accurate information than to give incorrect information quickly. This builds trust."
  },
  {
    id: "math_1",
    question: "What is 15 + 27?",
    options: ["41", "42", "43", "44"],
    correctAnswer: 1,
    category: "Mathematics",
    difficulty: 1,
    explanation: "15 + 27 = 42"
  },
  {
    id: "cs_3",
    question: "What should you do FIRST?",
    scenario: "During a busy shift, a customer approaches you with a complaint while you're helping another customer.",
    options: [
      "Ignore the new customer until you're completely done.",
      "Acknowledge the new customer and let them know you'll be with them shortly.",
      "Stop helping your current customer to address the complaint.",
      "Point the new customer to another employee."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 2,
    explanation: "Acknowledging waiting customers shows respect while maintaining focus on your current customer. It manages expectations effectively."
  },
  
  // Level 3-4 Questions (Medium)
  {
    id: "cs_4",
    question: "What is the BEST response?",
    scenario: "A customer is upset because a promotion they saw advertised has expired. They insist they should still get the discount.",
    options: [
      "Tell them there's nothing you can do about expired promotions.",
      "Apologize for their frustration and explain the promotion period while offering to check for current offers.",
      "Give them the expired discount to avoid conflict.",
      "Argue that the expiration date was clearly stated."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 3,
    explanation: "Empathize with the customer while setting appropriate boundaries. Offering alternatives shows you care about their business."
  },
  {
    id: "math_2",
    question: "What is 144 ÷ 12?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Mathematics",
    difficulty: 3,
    explanation: "144 ÷ 12 = 12"
  },
  {
    id: "cs_5",
    question: "What should you prioritize?",
    scenario: "You have three tasks: a customer waiting for help, a phone ringing, and restocking that needs to be done within the hour.",
    options: [
      "Answer the phone first since it might be urgent.",
      "Help the waiting customer, then answer the phone, then restock.",
      "Do the restocking first since it has a deadline.",
      "Ignore the phone and focus on the customer and restocking."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 3,
    explanation: "In-person customers take priority as they're already waiting. The phone is next, and restocking can be done after as it has the most flexible timeline."
  },
  {
    id: "cs_6",
    question: "What is the BEST course of action?",
    scenario: "A customer wants to return an item without a receipt. Your store policy requires receipts for returns.",
    options: [
      "Refuse the return immediately citing store policy.",
      "Accept the return without question to keep the customer happy.",
      "Explain the policy politely and offer alternative solutions like store credit or exchange.",
      "Call security to handle the situation."
    ],
    correctAnswer: 2,
    category: "Customer Service",
    difficulty: 4,
    explanation: "Enforcing policies while offering alternatives shows professionalism and flexibility within guidelines."
  },
  
  // Level 5-6 Questions (Medium-Hard)
  {
    id: "cs_7",
    question: "How should you handle this?",
    scenario: "A customer is becoming increasingly loud and using inappropriate language after being told an item is out of stock.",
    options: [
      "Match their energy to show you're not intimidated.",
      "Remain calm, lower your voice, and offer to check with other locations or order the item.",
      "Walk away from the customer immediately.",
      "Tell them they'll be asked to leave if they continue."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 5,
    explanation: "Staying calm and speaking softly often de-escalates situations. Offering solutions shows you're still trying to help despite their behavior."
  },
  {
    id: "math_3",
    question: "If a product costs $80 and is on sale for 25% off, what is the sale price?",
    options: ["$55", "$60", "$65", "$70"],
    correctAnswer: 1,
    category: "Mathematics",
    difficulty: 5,
    explanation: "25% of $80 is $20, so $80 - $20 = $60"
  },
  {
    id: "cs_8",
    question: "What is the MOST professional approach?",
    scenario: "A customer asks for your personal opinion on whether they should buy Product A or Product B.",
    options: [
      "Tell them which one you would personally buy.",
      "Ask about their needs and help them compare features to make an informed decision.",
      "Recommend the more expensive option.",
      "Tell them you can't give opinions."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 5,
    explanation: "Helping customers make informed decisions based on their needs builds trust and ensures satisfaction better than personal opinions."
  },
  {
    id: "cs_9",
    question: "What should you do?",
    scenario: "You made an error processing a customer's order yesterday. They haven't noticed yet, but it will affect their delivery date.",
    options: [
      "Wait to see if they notice and contact you.",
      "Proactively contact them, explain the error, apologize, and provide solutions.",
      "Fix it quietly without telling them.",
      "Ask your supervisor to contact them instead."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 6,
    explanation: "Proactively addressing mistakes demonstrates integrity and gives you the opportunity to maintain trust through transparent communication."
  },
  
  // Level 7-8 Questions (Hard)
  {
    id: "cs_10",
    question: "What is the BEST strategy?",
    scenario: "A long-time customer is threatening to take their business elsewhere because a competitor offers a lower price on an item.",
    options: [
      "Immediately match the competitor's price.",
      "Let them know they're free to shop wherever they want.",
      "Thank them for their loyalty, explain your value proposition, and see if you can offer a loyalty discount or added value.",
      "Badmouth the competitor's quality."
    ],
    correctAnswer: 2,
    category: "Customer Service",
    difficulty: 7,
    explanation: "Acknowledging loyalty while explaining your value helps customers see beyond price. Offering alternatives shows you value their business without setting unsustainable precedents."
  },
  {
    id: "math_4",
    question: "A customer has a coupon for 20% off, and there's also a store-wide 10% discount. If an item costs $100, what's the final price if discounts are applied sequentially?",
    options: ["$70", "$72", "$75", "$80"],
    correctAnswer: 1,
    category: "Mathematics",
    difficulty: 7,
    explanation: "First 20% off $100 = $80. Then 10% off $80 = $72. Sequential discounts: $100 × 0.8 × 0.9 = $72"
  },
  {
    id: "cs_11",
    question: "What approach should you take?",
    scenario: "A customer is asking for an exception to store policy that you've seen other employees grant in the past, but you're not authorized to approve it.",
    options: [
      "Grant the exception since others have done it.",
      "Refuse and cite that you're not authorized.",
      "Explain your authorization limits and offer to get a manager who can help them.",
      "Pretend you are authorized and make the decision."
    ],
    correctAnswer: 2,
    category: "Customer Service",
    difficulty: 7,
    explanation: "Being transparent about authorization while actively seeking help shows integrity and customer focus without overstepping your role."
  },
  {
    id: "cs_12",
    question: "How should you respond?",
    scenario: "A customer received a damaged item and is asking for both a replacement and a discount on their next purchase as compensation.",
    options: [
      "Agree to both immediately to make them happy.",
      "Offer only the replacement as that's standard procedure.",
      "Apologize sincerely, offer the replacement, and explain what additional compensation you can provide within policy.",
      "Tell them they can only have one or the other."
    ],
    correctAnswer: 2,
    category: "Customer Service",
    difficulty: 8,
    explanation: "Apologizing and providing standard resolution while being clear about what additional compensation is possible balances customer satisfaction with business policy."
  },
  
  // Level 9-10 Questions (Very Hard)
  {
    id: "cs_13",
    question: "What is the MOST appropriate course of action?",
    scenario: "You discover that a colleague has been giving unauthorized discounts to friends and family. The colleague is well-liked and has been with the company for years.",
    options: [
      "Ignore it since they're a good employee otherwise.",
      "Confront your colleague directly and demand they stop.",
      "Report the situation to your supervisor through proper channels.",
      "Start giving unauthorized discounts too to be fair."
    ],
    correctAnswer: 2,
    category: "Professional Ethics",
    difficulty: 9,
    explanation: "Ethics violations should be reported through proper channels. This protects the company and maintains integrity while allowing appropriate investigation."
  },
  {
    id: "cs_14",
    question: "What should be your priority?",
    scenario: "During a product recall, you have a customer who purchased the affected item but seems unaware of the recall. The recall is for safety reasons.",
    options: [
      "Don't mention it unless they ask to avoid scaring them.",
      "Immediately inform them about the recall, explain the safety concern, and facilitate the return/replacement process.",
      "Wait for them to see the recall notice themselves.",
      "Only tell them if they're buying another product today."
    ],
    correctAnswer: 1,
    category: "Customer Service",
    difficulty: 9,
    explanation: "Customer safety is paramount. Proactively informing customers of safety recalls demonstrates care and responsibility, even if it means a difficult conversation."
  },
  {
    id: "math_5",
    question: "If sales increased by 50% from last year's $80,000, then decreased by 30% this year, what are current sales?",
    options: ["$84,000", "$90,000", "$98,000", "$100,000"],
    correctAnswer: 0,
    category: "Mathematics",
    difficulty: 9,
    explanation: "$80,000 × 1.5 = $120,000, then $120,000 × 0.7 = $84,000"
  },
  {
    id: "cs_15",
    question: "How should you handle this complex situation?",
    scenario: "A customer wants a refund for a service they received but claims was unsatisfactory. However, you have documentation showing they approved the work and signed off on completion.",
    options: [
      "Refuse the refund and show them their signature.",
      "Give the refund immediately to avoid conflict.",
      "Review the documentation together, listen to their concerns, and explore what would constitute a fair resolution for both parties.",
      "Tell them to take legal action if they're unsatisfied."
    ],
    correctAnswer: 2,
    category: "Conflict Resolution",
    difficulty: 10,
    explanation: "Complex disputes require collaborative problem-solving. Reviewing facts together while exploring mutually acceptable solutions often leads to better outcomes than rigid positions."
  },
];

/**
 * Get random questions appropriate for the current game level
 * Returns 3 questions per level-up
 */
export function getQuestionsForLevel(level: number, count: number = 3): Question[] {
  // Filter questions that are appropriate for this level
  // Use questions that are at most 2 difficulty levels above current level
  const maxDifficulty = Math.min(level + 2, 10);
  const minDifficulty = Math.max(level - 1, 1);
  
  const suitableQuestions = QUESTION_BANK.filter(
    q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty
  );
  
  // Shuffle and pick 'count' questions
  const shuffled = [...suitableQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get a single random question that hasn't been asked yet
 */
export function getRandomQuestion(usedQuestionIds: string[]): Question {
  const availableQuestions = QUESTION_BANK.filter(
    q => !usedQuestionIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    // If all questions have been used, reset and use all questions
    return QUESTION_BANK[Math.floor(Math.random() * QUESTION_BANK.length)];
  }
  
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
}

/**
 * Calculate bonus points based on quiz performance
 */
export function calculateQuizBonus(
  correctAnswers: number,
  totalQuestions: number,
  level: number
): number {
  const baseBonus = 100;
  const levelMultiplier = level;
  const accuracyBonus = (correctAnswers / totalQuestions) * 2; // 0 to 2x multiplier
  
  return Math.floor(baseBonus * levelMultiplier * accuracyBonus);
}

/**
 * Calculate points for a single question based on speed
 * @param isCorrect - Whether the answer was correct
 * @param timeElapsed - Time taken to answer in seconds (max 30)
 * @returns Points to add (positive for correct, negative for incorrect)
 */
export function calculateQuestionPoints(isCorrect: boolean, timeElapsed: number): number {
  if (!isCorrect) {
    // Wrong answer loses 50 points
    return -50;
  }
  
  // Correct answer: base 100 points + speed bonus
  // Faster answers get more points (max 200 extra for answering in <5 seconds)
  const basePoints = 100;
  const timeLimit = 30;
  
  // Calculate speed bonus (0-200 points)
  // Answer in 0-5 seconds: +200 points
  // Answer in 5-15 seconds: +100 points  
  // Answer in 15-25 seconds: +50 points
  // Answer in 25-30 seconds: +0 points
  let speedBonus = 0;
  if (timeElapsed <= 5) {
    speedBonus = 200;
  } else if (timeElapsed <= 15) {
    speedBonus = 150 - ((timeElapsed - 5) * 5); // Decreases from 150 to 100
  } else if (timeElapsed <= 25) {
    speedBonus = 100 - ((timeElapsed - 15) * 5); // Decreases from 100 to 50
  } else {
    speedBonus = Math.max(0, 50 - ((timeElapsed - 25) * 10)); // Decreases from 50 to 0
  }
  
  return Math.floor(basePoints + speedBonus);
}
