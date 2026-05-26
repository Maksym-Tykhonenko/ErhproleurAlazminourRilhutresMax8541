export interface QuizPrompt {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

const raw = [
  {explorer: 'columbus', items: [
    {q: 'What year did Columbus reach the Caribbean?', o: ['1480', '1492', '1501', '1510'], a: '1492'},
    {q: 'Which ocean did Columbus cross?', o: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'], a: 'Atlantic Ocean'},
    {q: 'Which country sponsored Columbus’s voyage?', o: ['Portugal', 'England', 'France', 'Spain'], a: 'Spain'},
  ]},
  {explorer: 'magellan', items: [
    {q: 'What was Magellan searching for?', o: ['North Pole', 'Western route to Asia', 'Lost islands', 'Arctic route'], a: 'Western route to Asia'},
    {q: 'Which strait was named after Magellan?', o: ['Drake Passage', 'Hudson Strait', 'Strait of Magellan', 'Gibraltar'], a: 'Strait of Magellan'},
    {q: 'Which ocean did Magellan’s fleet enter after South America?', o: ['Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean', 'Indian Ocean'], a: 'Pacific Ocean'},
  ]},
  {explorer: 'cook', items: [
    {q: 'Which region did James Cook map?', o: ['Africa', 'Antarctica', 'Australia', 'Greenland'], a: 'Australia'},
    {q: 'What was Cook famous for creating?', o: ['Weapons', 'Trade ports', 'Accurate maps', 'Castles'], a: 'Accurate maps'},
    {q: 'Which ocean is most connected to Cook’s voyages?', o: ['Indian Ocean', 'Arctic Ocean', 'Pacific Ocean', 'Mediterranean Sea'], a: 'Pacific Ocean'},
  ]},
  {explorer: 'dagama', items: [
    {q: 'Vasco da Gama opened a sea route to which country?', o: ['China', 'Japan', 'India', 'Brazil'], a: 'India'},
    {q: 'Which continent did da Gama sail around?', o: ['Europe', 'South America', 'Africa', 'Australia'], a: 'Africa'},
    {q: 'Which country did Vasco da Gama represent?', o: ['Spain', 'England', 'Portugal', 'France'], a: 'Portugal'},
  ]},
  {explorer: 'marcopolo', items: [
    {q: 'Which trade route is connected to Marco Polo?', o: ['Amber Road', 'Silk Road', 'Spice Circle', 'Gold Route'], a: 'Silk Road'},
    {q: 'Marco Polo traveled mainly through which continent?', o: ['Africa', 'Asia', 'Australia', 'Antarctica'], a: 'Asia'},
    {q: 'What made Marco Polo famous?', o: ['Building ships', 'Travel writings', 'Discovering islands', 'Creating maps'], a: 'Travel writings'},
  ]},
  {explorer: 'vespucci', items: [
    {q: 'What did Vespucci help identify?', o: ['Pacific islands', 'New continents', 'Arctic route', 'Volcano regions'], a: 'New continents'},
    {q: 'Which continent did Vespucci explore?', o: ['Europe', 'Antarctica', 'South America', 'Australia'], a: 'South America'},
    {q: 'What was later named after Amerigo Vespucci?', o: ['Atlantic Ocean', 'Pacific Ocean', 'America', 'Greenland'], a: 'America'},
  ]},
  {explorer: 'hudson', items: [
    {q: 'Which bay was named after Henry Hudson?', o: ['Baffin Bay', 'Drake Bay', 'Hudson Bay', 'Biscay Bay'], a: 'Hudson Bay'},
    {q: 'What type of route was Hudson searching for?', o: ['Desert route', 'Mountain route', 'Northern sea route', 'Jungle passage'], a: 'Northern sea route'},
    {q: 'Which region did Hudson explore?', o: ['South Pacific', 'Mediterranean', 'Northern Canada', 'East Africa'], a: 'Northern Canada'},
  ]},
  {explorer: 'zhenghe', items: [
    {q: 'Which country did Zheng He represent?', o: ['Japan', 'Korea', 'China', 'India'], a: 'China'},
    {q: 'Which ocean did Zheng He mainly travel across?', o: ['Atlantic Ocean', 'Arctic Ocean', 'Indian Ocean', 'Southern Ocean'], a: 'Indian Ocean'},
    {q: 'Zheng He commanded large fleets for what purpose?', o: ['War only', 'Trade and diplomacy', 'Fishing', 'Mining'], a: 'Trade and diplomacy'},
  ]},
  {explorer: 'dias', items: [
    {q: 'What major location did Dias sail around?', o: ['Cape Horn', 'Cape of Good Hope', 'Gibraltar', 'Panama Canal'], a: 'Cape of Good Hope'},
    {q: 'Dias proved a connection between which oceans?', o: ['Pacific and Arctic', 'Atlantic and Indian', 'Arctic and Atlantic', 'Pacific and Southern'], a: 'Atlantic and Indian'},
    {q: 'Which country did Bartolomeu Dias represent?', o: ['Spain', 'England', 'France', 'Portugal'], a: 'Portugal'},
  ]},
  {explorer: 'leiferikson', items: [
    {q: 'Which region did Leif Erikson likely reach?', o: ['South America', 'Africa', 'North America', 'Australia'], a: 'North America'},
    {q: 'What was the name of the land described in Norse stories?', o: ['Atlantis', 'Eldoria', 'Vinland', 'Greenlandia'], a: 'Vinland'},
    {q: 'Which culture did Leif Erikson belong to?', o: ['Roman', 'Chinese', 'Norse', 'Persian'], a: 'Norse'},
  ]},
  {explorer: 'tasman', items: [
    {q: 'Which island was named after Abel Tasman?', o: ['Iceland', 'Greenland', 'Tasmania', 'Madagascar'], a: 'Tasmania'},
    {q: 'Which region did Tasman explore?', o: ['Mediterranean', 'South Pacific', 'Arctic Circle', 'Sahara'], a: 'South Pacific'},
    {q: 'Which country organized Tasman’s voyages?', o: ['Spain', 'Portugal', 'Netherlands', 'Norway'], a: 'Netherlands'},
  ]},
  {explorer: 'elcano', items: [
    {q: 'What historic achievement did Elcano complete?', o: ['Finding Australia', 'First circumnavigation', 'Arctic crossing', 'Reaching Antarctica'], a: 'First circumnavigation'},
    {q: 'Which explorer originally led the expedition?', o: ['Cook', 'Columbus', 'Magellan', 'Hudson'], a: 'Magellan'},
    {q: 'What did the expedition prove?', o: ['Earth was flat', 'Global sea travel was possible', 'Pacific was small', 'Africa was isolated'], a: 'Global sea travel was possible'},
  ]},
  {explorer: 'drake', items: [
    {q: 'Which country did Francis Drake represent?', o: ['France', 'Spain', 'England', 'Portugal'], a: 'England'},
    {q: 'What major journey did Drake complete?', o: ['Arctic crossing', 'Circumnavigation', 'Nile expedition', 'Desert crossing'], a: 'Circumnavigation'},
    {q: 'Which ocean was strongly connected to Drake’s voyages?', o: ['Arctic Ocean', 'Pacific Ocean', 'Southern Ocean', 'Indian Ocean'], a: 'Pacific Ocean'},
  ]},
  {explorer: 'amundsen', items: [
    {q: 'What famous destination did Amundsen reach?', o: ['Mount Everest', 'North America', 'South Pole', 'Amazon River'], a: 'South Pole'},
    {q: 'Which country was Amundsen from?', o: ['Sweden', 'Denmark', 'Norway', 'Finland'], a: 'Norway'},
    {q: 'What type of exploration was Amundsen known for?', o: ['Desert exploration', 'Jungle travel', 'Polar expeditions', 'River mapping'], a: 'Polar expeditions'},
  ]},
  {explorer: 'cartier', items: [
    {q: 'Which river did Jacques Cartier explore?', o: ['Amazon River', 'Nile River', 'Saint Lawrence River', 'Mississippi River'], a: 'Saint Lawrence River'},
    {q: 'Which country sponsored Cartier’s voyages?', o: ['England', 'Portugal', 'France', 'Spain'], a: 'France'},
    {q: 'Which modern country is connected to Cartier’s explorations?', o: ['Brazil', 'India', 'Canada', 'Australia'], a: 'Canada'},
  ]},
  {explorer: 'pytheas', items: [
    {q: 'Which region did Pytheas explore?', o: ['South America', 'Sahara', 'Northern Atlantic', 'Antarctica'], a: 'Northern Atlantic'},
    {q: 'What did Pytheas study during voyages?', o: ['Volcanoes', 'Ocean tides', 'Desert plants', 'Tropical storms'], a: 'Ocean tides'},
    {q: 'Which ancient civilization did Pytheas belong to?', o: ['Roman', 'Egyptian', 'Greek', 'Viking'], a: 'Greek'},
  ]},
];

export const quizPromptArchive: QuizPrompt[] = raw.flatMap(group =>
  group.items.map((item, idx) => ({
    id: `${group.explorer}-${idx}`,
    question: item.q,
    options: item.o,
    answer: item.a,
  })),
);

export const QUIZ_LENGTH = 10;

export const pickQuizRound = (count: number = QUIZ_LENGTH): QuizPrompt[] => {
  const pool = [...quizPromptArchive];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map(prompt => ({
    ...prompt,
    options: shuffleOptions(prompt.options),
  }));
};

const shuffleOptions = (arr: string[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
