enum EChoiceType {
  MultipleChoice,
  SingleChoice,
}

export const survey = {
  title: 'Surf Ey! Surface! or Service! & Survey...llance?',
  description: "Single Choice ('who wants to be a millionaire' with no money)",
  eyecatcher: {
    path: './survey/eyecatcher.png',
    alt: 'Sir, Way...t for it!',
  },
  mode: EChoiceType.SingleChoice,
  questions: [
    {
      question: 'Which of the following colours do you like most?',
      answers: ['Blue', 'Red', 'Yellow', 'Green'],
    },
    {
      question: 'What is your favorite pet?',
      answers: ['Dog', 'Cat', 'Fish', 'Bird'],
    },
    {
      question:
        'What is the number of this question if you count lists like most IT guys?',
      answers: ['0', '1', '2', '3'],
    },
    {
      question: 'Why would I invent questions when the AI could just fill 10?',
      answers: ["I don't know", "I don't know", "I don't know", "I don't know"],
    },
    {
      question: 'What is your favorite food?',
      answers: ['Pizza', 'Burger', 'Sushi', 'Tacos'],
    },
    {
      question: 'What is your favorite movie?',
      answers: [
        'The Godfather',
        'The Shawshank Redemption',
        'The Dark Knight',
        'Pulp Fiction',
      ],
    },
    {
      question: 'What is your favorite book?',
      answers: [
        'To Kill a Mockingbird',
        '1984',
        'The Catcher in the Rye',
        'The Great Gatsby',
      ],
    },
    {
      question: 'What is your favorite hobby?',
      answers: ['Reading', 'Playing sports', 'Watching movies', 'Traveling'],
    },
    {
      question: 'What is your favorite music genre?',
      answers: ['Rock', 'Pop', 'Hip hop', 'Electronic'],
    },
    {
      question: 'What is your favorite TV show?',
      answers: ['Breaking Bad', 'Game of Thrones', 'Friends', 'The Office'],
    },
    // Add 10 random questions here
    {
      question: 'What is your favorite animal?',
      answers: ['Elephant', 'Lion', 'Giraffe', 'Penguin'],
    },
    {
      question: 'What is your favorite season?',
      answers: ['Spring', 'Summer', 'Fall', 'Winter'],
    },
    {
      question: 'What is your favorite sport?',
      answers: ['Football', 'Basketball', 'Tennis', 'Swimming'],
    },
    {
      question: 'What is your favorite holiday destination?',
      answers: ['Beach', 'Mountain', 'City', 'Countryside'],
    },
    {
      question: 'What is your favorite drink?',
      answers: ['Coffee', 'Tea', 'Soda', 'Beer'],
    },
    {
      question: 'What is your favorite video game?',
      answers: ['Minecraft', 'Fortnite', 'Call of Duty', 'FIFA'],
    },
    {
      question: 'What is your favorite social media platform?',
      answers: ['Facebook', 'Twitter', 'Instagram', 'TikTok'],
    },
    {
      question: 'What is your favorite car brand?',
      answers: ['Toyota', 'Ford', 'BMW', 'Mercedes-Benz'],
    },
    {
      question: 'What is your favorite clothing brand?',
      answers: ['Nike', 'Adidas', 'Zara', 'H&M'],
    },
    {
      question: 'What is your favorite superhero?',
      answers: ['Superman', 'Batman', 'Spider-Man', 'Iron Man'],
    },
  ],
};
