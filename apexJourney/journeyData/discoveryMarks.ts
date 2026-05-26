import {voyagerArchive} from './voyagers';

export interface DiscoveryMark {
  id: string;
  title: string;
  voyagerId: string;
  date: string;
  facts: string;
  x: number; // 0..1 of map width
  y: number; // 0..1 of map height
}

export const discoveryMarks: DiscoveryMark[] = [
  {
    id: 'mark-caribbean',
    title: 'Caribbean Islands',
    voyagerId: 'columbus',
    date: '1492',
    facts: 'Columbus reached islands in the Caribbean while searching for a western route to Asia, opening regular Atlantic contact between Europe and the Americas.',
    x: 0.27, y: 0.46,
  },
  {
    id: 'mark-strait',
    title: 'Strait of Magellan',
    voyagerId: 'magellan',
    date: '1520',
    facts: 'A navigable sea passage at the southern tip of South America connecting the Atlantic and Pacific Oceans.',
    x: 0.30, y: 0.82,
  },
  {
    id: 'mark-australia',
    title: 'Eastern Coast of Australia',
    voyagerId: 'cook',
    date: '1770',
    facts: 'Cook charted the eastern coastline of Australia during his Pacific expedition, sharpening European understanding of the region.',
    x: 0.85, y: 0.78,
  },
  {
    id: 'mark-india',
    title: 'Sea Route to India',
    voyagerId: 'dagama',
    date: '1498',
    facts: 'Da Gama completed the first voyage from Europe to India by sea, opening a crucial trade route around southern Africa.',
    x: 0.66, y: 0.58,
  },
  {
    id: 'mark-silkroad',
    title: 'Silk Road Trade Regions',
    voyagerId: 'marcopolo',
    date: '13th c.',
    facts: 'Marco Polo travelled along trade routes connected to the Silk Road, describing cities and customs of distant Asia.',
    x: 0.72, y: 0.40,
  },
  {
    id: 'mark-southamerica',
    title: 'South American Coastline',
    voyagerId: 'vespucci',
    date: 'c. 1499',
    facts: 'Vespucci mapped large sections of the South American coast and helped show that the lands were separate continents.',
    x: 0.32, y: 0.70,
  },
  {
    id: 'mark-hudson',
    title: 'Hudson Bay',
    voyagerId: 'hudson',
    date: '1610',
    facts: 'Hudson explored the massive northern bay that now bears his name in northeastern Canada.',
    x: 0.27, y: 0.30,
  },
  {
    id: 'mark-indianocean',
    title: 'Indian Ocean Trade Routes',
    voyagerId: 'zhenghe',
    date: '15th c.',
    facts: 'Zheng He led Ming treasure fleets across the Indian Ocean to Southeast Asia, India, Arabia and East Africa.',
    x: 0.70, y: 0.50,
  },
  {
    id: 'mark-cape',
    title: 'Cape of Good Hope',
    voyagerId: 'dias',
    date: '1488',
    facts: 'Dias became the first European to sail around the southern tip of Africa, proving Atlantic and Indian Oceans were connected.',
    x: 0.56, y: 0.78,
  },
  {
    id: 'mark-vinland',
    title: 'Vinland Landing',
    voyagerId: 'leiferikson',
    date: 'c. 1000',
    facts: 'Leif Erikson is believed to have reached a region called Vinland in North America centuries before Columbus.',
    x: 0.23, y: 0.22,
  },
  {
    id: 'mark-tasmania',
    title: 'Tasmania & New Zealand',
    voyagerId: 'tasman',
    date: '1642',
    facts: 'Tasman became the first European to map Tasmania and the coasts of New Zealand.',
    x: 0.89, y: 0.85,
  },
  {
    id: 'mark-circle',
    title: 'First Circumnavigation',
    voyagerId: 'elcano',
    date: '1522',
    facts: 'Elcano led the surviving crew back to Spain after Magellan’s death, completing the first round-the-world voyage.',
    x: 0.50, y: 0.55,
  },
  {
    id: 'mark-pacific',
    title: 'Pacific Coastal Routes',
    voyagerId: 'drake',
    date: '1577–1580',
    facts: 'Drake explored and mapped Pacific coastal routes during his circumnavigation under the English flag.',
    x: 0.15, y: 0.55,
  },
  {
    id: 'mark-southpole',
    title: 'South Pole',
    voyagerId: 'amundsen',
    date: '1911',
    facts: 'Amundsen led the first expedition to successfully reach the South Pole.',
    x: 0.52, y: 0.94,
  },
  {
    id: 'mark-stlaw',
    title: 'Saint Lawrence River',
    voyagerId: 'cartier',
    date: '1535',
    facts: 'Cartier explored and mapped the Saint Lawrence River system in present-day Canada.',
    x: 0.30, y: 0.27,
  },
  {
    id: 'mark-northatlantic',
    title: 'Northern Atlantic',
    voyagerId: 'pytheas',
    date: '4th c. BC',
    facts: 'Pytheas sailed beyond the Mediterranean to describe Britain and other northern Atlantic regions.',
    x: 0.47, y: 0.28,
  },
];

export const getMarkVoyager = (mark: DiscoveryMark) =>
  voyagerArchive.find(v => v.id === mark.voyagerId);
