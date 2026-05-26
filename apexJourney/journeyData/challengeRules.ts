import {voyagerArchive, VoyagerEntry} from './voyagers';

export interface ChallengeRule {
  id: string;
  copy: string;
  predicate: (v: VoyagerEntry) => boolean;
}

export const challengeRules: ChallengeRule[] = [
  {id: 'r-british', copy: 'Tap only British explorers', predicate: v => v.origin === 'Britain'},
  {id: 'r-not-spanish', copy: 'Do not tap Spanish explorers', predicate: v => v.origin !== 'Spain'},
  {id: 'r-portuguese', copy: 'Tap only Portuguese explorers', predicate: v => v.origin === 'Portugal'},
  {id: 'r-not-norse', copy: 'Avoid Viking explorers', predicate: v => v.origin !== 'Norse'},
  {id: 'r-english', copy: 'Tap only explorers from England', predicate: v => v.origin === 'England'},
  {id: 'r-not-spain', copy: 'Do not tap explorers connected to Spain', predicate: v => v.origin !== 'Spain'},
  {id: 'r-polar', copy: 'Tap only polar explorers', predicate: v => v.arenas.includes('Antarctic') || v.arenas.includes('Arctic')},
  {id: 'r-not-pacific', copy: 'Avoid Pacific navigators', predicate: v => !v.arenas.includes('Pacific')},
  {id: 'r-atlantic', copy: 'Tap only Atlantic explorers', predicate: v => v.arenas.includes('Atlantic')},
  {id: 'r-not-portugal', copy: 'Do not tap explorers from Portugal', predicate: v => v.origin !== 'Portugal'},
  {id: 'r-asia', copy: 'Tap only explorers who reached Asia', predicate: v => v.reachedAsia},
  {id: 'r-not-arctic', copy: 'Avoid Arctic explorers', predicate: v => !v.arenas.includes('Arctic')},
  {id: 'r-world', copy: 'Tap only world travelers', predicate: v => v.worldTraveler},
  {id: 'r-not-caribbean', copy: 'Do not tap explorers linked to the Caribbean', predicate: v => !v.arenas.includes('Caribbean')},
  {id: 'r-south-pacific', copy: 'Tap only South Pacific explorers', predicate: v => v.arenas.includes('Pacific') && (v.id === 'cook' || v.id === 'tasman')},
  {id: 'r-not-france', copy: 'Avoid explorers from France', predicate: v => v.origin !== 'France'},
  {id: 'r-age', copy: 'Tap only navigators from the Age of Exploration', predicate: v => v.era === 'Age of Exploration'},
  {id: 'r-not-medieval', copy: 'Do not tap medieval travelers', predicate: v => v.era !== 'Medieval'},
  {id: 'r-northamerica', copy: 'Tap only explorers connected to North America', predicate: v => v.arenas.includes('North Atlantic') || v.id === 'hudson' || v.id === 'cartier' || v.id === 'leiferikson'},
  {id: 'r-not-indian', copy: 'Avoid explorers who crossed the Indian Ocean', predicate: v => !v.arenas.includes('Indian Ocean')},
];

export const challengeRoster = voyagerArchive;

export const pickChallengeRule = (excludeId?: string) => {
  const pool = challengeRules.filter(r => r.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
};
