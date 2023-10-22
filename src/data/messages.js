const messages = [
  'Aww yes! 👌',
  'Nice job! 👍',
  'Hooray for you! 🎉',
  'Sweet! 🎊',
  'Yasssssss! 🥳',
  "You're a star! 🌟",
  'Way to go! 🤞',
];

export const getMessage = () => messages[(Math.random() * messages.length) | 0];
