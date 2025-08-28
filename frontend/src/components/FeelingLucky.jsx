import React, { useState } from 'react';
import styled from 'styled-components';

const inspiringQuotes = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It is during our darkest moments that we must focus to see the light.",
  "Strive not to be a success, but rather to be of value.",
  "The mind is everything. What you think you become.",
  "The best way to predict the future is to create it.",
  "Happiness is not something ready made. It comes from your own actions.",
  "Your time is limited, don't waste it living someone else's life.",
  "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "The secret of getting ahead is getting started.",
  "It's not whether you get knocked down, it's whether you get up.",
  "The journey of a thousand miles begins with a single step.",
  "Eighty percent of success is showing up.",
  "I find that the harder I work, the more luck I seem to have.",
  "The successful warrior is the average man, with laser-like focus.",
  "Develop an 'attitude of gratitude'. Say thank you to everyone you meet for everything they do for you.",
  "You must be the change you wish to see in the world.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "The future depends on what you do today.",
  "Quality is not an act, it is a habit.",
  "Setting goals is the first step in turning the invisible into the visible.",
  "The only place where success comes before work is in the dictionary.",
  "The best revenge is massive success.",
  "Don't watch the clock; do what it does. Keep going.",
  "Keep your eyes on the stars, and your feet on the ground.",
  "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don't let yesterday take up too much of today.",
  "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
  "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  "All our dreams can come true, if we have the courage to pursue them.",
  "Good things come to people who wait, but better things come to those who go out and get them.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "Just when the caterpillar thought the world was over, it became a butterfly.",
  "When you cease to dream, you cease to live.",
  "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
  "The critical ingredient is getting off your butt and doing something. It’s as simple as that. A lot of people have ideas, but there are few who decide to do something about them now. Not tomorrow. Not next week. But today. The true entrepreneur is a doer, not a dreamer.",
  "If you want to achieve greatness stop asking for permission.",
  "Things work out best for those who make the best of how things work out.",
  "To live a creative life, we must lose our fear of being wrong.",
  "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  "Trust because you are willing to accept the risk, not because it's safe or certain.",
  "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.",
  "All our dreams can come true, if we have the courage to pursue them.",
  "The best way to appreciate your job is to imagine yourself without one.",
  "Don't be afraid to give up the good to go for the great.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "The value of an idea lies in the using of it.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "The mind is everything. What you think you become.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "The most difficult thing is the decision to act, the rest is merely tenacity.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is better to fail in originality than to succeed in imitation.",
  "Action is the foundational key to all success.",
  "The only way to achieve the impossible is to believe it is possible.",
  "The two most important days in your life are the day you are born and the day you find out why.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "When you go through hardships and decide not to surrender, that is strength.",
  "It is by acts and not by ideas that people live.",
  "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got to keep going.",
  "The man who has confidence in himself gains the confidence of others.",
  "If you want to conquer fear, don't sit home and think about it. Go out and get busy.",
  "When we strive to become better than we are, everything around us becomes better too.",
  "There is no magic to achievement. It's really about hard work, choices, and persistence.",
  "The only place where your dream becomes impossible is in your own head.",
  "You are never too old to set another goal or to dream a new dream.",
  "What defines us is how well we rise after falling.",
  "We may encounter many defeats but we must not be defeated.",
  "If you have a dream, don't just sit there. Gather courage to believe that you can succeed and leave no stone unturned to make it a reality.",
  "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
  "The only impossible journey is the one you never begin.",
  "The only true wisdom is in knowing you know nothing.",
  "Life is really simple, but we insist on making it complicated.",
  "The unexamined life is not worth living.",
  "There is only one good, knowledge, and one evil, ignorance.",
  "Be kind, for everyone you meet is fighting a hard battle.",
  "The only thing necessary for the triumph of evil is for good men to do nothing.",
  "Happiness is when what you think, what you say, and what you do are in harmony.",
  "No man is an island entire of itself; every man is a piece of the continent, a part of the main.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The individual has always had to struggle to keep from being overwhelmed by the tribe. If you try it, you will be lonely often, and sometimes frightened. But no price is too high to pay for the privilege of owning yourself.",
  "It is not the strongest of the species that survives, nor the most intelligent that survives. It is the one that is most adaptable to change.",
  "To be ignorant of what occurred before you were born is to remain always a child.",
  "The wise man understands because he has experienced.",
  "The first step toward knowledge is to know that we are ignorant.",
  "Wonder is the feeling of a philosopher, and philosophy begins in wonder.",
  "Educating the mind without educating the heart is no education at all.",
  "The power of imagination makes us infinite.",
  "Only a life lived for others is a life worthwhile.",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "Pain is inevitable. Suffering is optional.",
  "The truth is, everyone is going to hurt you. You just got to find the ones worth suffering for.",
  "Three things cannot be long hidden: the sun, the moon, and the truth.",
  "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
  "Peace comes from within. Do not seek it without.",
  "There is no path to happiness: happiness is the path.",
  "When you realize how perfect everything is, you will tilt your head back and laugh at the sky.",
  "The root of suffering is attachment.",
  "Do not overrate what you have received, nor envy others. He who envies others does not obtain peace of mind.",
  "The only real failure in life is not to be true to the best one knows.",
  "To handle yourself, use your head; to handle others, use your heart.",
  "Never interrupt your enemy when he is making a mistake.",
  "The two most powerful warriors are patience and time.",
  "A leader is a dealer in hope.",
  "History is a set of lies agreed upon.",
  "The man who moves a mountain begins by carrying away small stones.",
  "Victory belongs to the most persevering.",
  "The only thing we have to fear is fear itself.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
];

const FeelingLucky = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false); // Keep loading for consistency, though it won't be used for API
  const [error, setError] = useState(null);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * inspiringQuotes.length);
    const selectedQuote = inspiringQuotes[randomIndex];
    setQuote({ content: selectedQuote, author: "" });
    setLoading(false); // Explicitly set to false
    setError(null);
  };

  return (
    <FeelingLuckyContainer>
      <FeelingLuckyButton onClick={getRandomQuote}>
        Feeling Lucky? Get a Quote!
      </FeelingLuckyButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {quote && (
        <QuoteCard>
          <QuoteText>"{quote.content}"</QuoteText>
          {quote.author && <QuoteAuthor>- {quote.author}</QuoteAuthor>}
        </QuoteCard>
      )}
    </FeelingLuckyContainer>
  );
};

const FeelingLuckyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  gap: 1.5rem;
`;

const FeelingLuckyButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* Warm gradient */
  color: white;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(255, 126, 95, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 126, 95, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(255, 126, 95, 0.2);
  }

  /* Removed disabled styles as API fetching is removed */
`;

const QuoteCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
  position: relative;

  &::before {
    content: '\"\"'; /* Opening quotation mark */
    font-size: 4rem;
    color: #feb47b;
    position: absolute;
    top: 10px;
    left: 20px;
    opacity: 0.2;
  }

  &::after {
    content: '\"\"'; /* Closing quotation mark */
    font-size: 4rem;
    color: #feb47b;
    position: absolute;
    bottom: 10px;
    right: 20px;
    opacity: 0.2;
    transform: rotate(180deg);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const QuoteText = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const QuoteAuthor = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #777;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
`;

export default FeelingLucky;
