export type VoyagerOrigin =
  | 'Italy'
  | 'Portugal'
  | 'Britain'
  | 'England'
  | 'Spain'
  | 'France'
  | 'Norway'
  | 'Netherlands'
  | 'China'
  | 'Ancient Greece'
  | 'Norse';

export type VoyagerEra = 'Ancient' | 'Medieval' | 'Age of Exploration' | 'Modern Polar';

export type VoyagerArena =
  | 'Atlantic'
  | 'Pacific'
  | 'Indian Ocean'
  | 'Arctic'
  | 'Antarctic'
  | 'Land Asia'
  | 'North Atlantic'
  | 'Caribbean';

export interface VoyagerEntry {
  id: string;
  name: string;
  years: string;
  origin: VoyagerOrigin;
  era: VoyagerEra;
  arenas: VoyagerArena[];
  reachedAsia: boolean;
  worldTraveler: boolean;
  subtitle: string;
  preview: string;
  storyLong: string;
  discoveries: string[];
  facts: string[];
  image: any;
}

export const voyagerArchive: VoyagerEntry[] = [
  {
    id: 'columbus',
    name: 'Christopher Columbus',
    years: '1451 – 1506',
    origin: 'Italy',
    era: 'Age of Exploration',
    arenas: ['Atlantic', 'Caribbean'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Italian navigator who reached the Caribbean in 1492.',
    preview:
      'Italian navigator sponsored by the Spanish Crown whose Atlantic voyages opened regular contact between Europe and the Americas.',
    storyLong:
      'Christopher Columbus was an Italian navigator whose voyages across the Atlantic Ocean became some of the most influential expeditions in world history. Sponsored by the Spanish Crown, he searched for a western sea route to Asia but instead reached islands in the Caribbean in 1492. His journeys opened regular contact between Europe and the Americas and changed global trade, exploration, and navigation forever.\n\nColumbus completed four major voyages across the Atlantic during his lifetime. He explored several Caribbean islands, including parts of present-day Cuba and Hispaniola, while continuing to believe he had reached areas near Asia. His expeditions encouraged many European kingdoms to invest in ocean travel and overseas exploration.\n\nAlthough his voyages brought major geographical discoveries to European maps, they also began a period of rapid colonial expansion. Columbus became one of the most recognized navigators of the Age of Exploration. His name remains closely connected with maritime history and transatlantic navigation.',
    discoveries: ['Caribbean islands route', 'Atlantic crossing in 1492', 'Cuba and Hispaniola contact'],
    facts: ['Completed four major Atlantic voyages.', 'Sailed under the Spanish flag from Italy.', 'Believed he had reached Asia.'],
    image: require('../../tuorsegemings/ChristopherColumbus.png'),
  },
  {
    id: 'magellan',
    name: 'Ferdinand Magellan',
    years: '1480 – 1521',
    origin: 'Portugal',
    era: 'Age of Exploration',
    arenas: ['Atlantic', 'Pacific'],
    reachedAsia: true,
    worldTraveler: true,
    subtitle: 'Portuguese leader of the first circumnavigation attempt.',
    preview:
      'Portuguese explorer sailing under the Spanish flag who began the first expedition to travel around the world in 1519.',
    storyLong:
      'Ferdinand Magellan was a Portuguese explorer best known for organizing the first expedition to travel around the world. Sailing under the Spanish flag, he began the historic voyage in 1519 with a fleet searching for a western route to the Spice Islands. His expedition proved that the Earth could be circumnavigated entirely by sea.\n\nMagellan led his fleet through the dangerous strait at the southern tip of South America, now called the Strait of Magellan. After entering the Pacific Ocean, the crew faced long months of storms, hunger, and difficult conditions. The voyage demonstrated the massive scale of the world\'s oceans and improved European understanding of global geography.\n\nMagellan himself did not complete the full journey, as he died during the expedition in the Philippines in 1521. However, part of his crew successfully returned to Spain, finishing the first circumnavigation in history. His expedition became one of the greatest achievements of maritime exploration.',
    discoveries: ['Strait of Magellan', 'Pacific Ocean crossing', 'First circumnavigation attempt'],
    facts: ['Began voyage in 1519 with a Spanish fleet.', 'Died in the Philippines in 1521.', 'Strait at the tip of South America bears his name.'],
    image: require('../../tuorsegemings/FerdinandMagellan.png'),
  },
  {
    id: 'cook',
    name: 'James Cook',
    years: '1728 – 1779',
    origin: 'Britain',
    era: 'Age of Exploration',
    arenas: ['Pacific', 'Antarctic', 'Arctic'],
    reachedAsia: false,
    worldTraveler: true,
    subtitle: 'British navigator who mapped the Pacific in three voyages.',
    preview:
      'British explorer, navigator, and cartographer whose three voyages mapped the Pacific with unmatched accuracy.',
    storyLong:
      'James Cook was a British explorer, navigator, and cartographer known for his detailed mapping of the Pacific Ocean. During three major voyages, he explored regions including New Zealand, Australia, Hawaii, and parts of the Arctic Ocean. His maps were considered among the most accurate of the eighteenth century.\n\nCook\'s expeditions combined scientific observation with maritime exploration. His crews studied astronomy, plants, animals, and ocean conditions while traveling through remote areas of the Pacific. These voyages expanded European geographic knowledge and improved navigation methods for future sailors.\n\nCook became famous for maintaining unusually organized conditions aboard his ships, helping crews survive long expeditions more safely. His journeys greatly influenced later exploration and trade routes across the Pacific region. Today, he remains one of the most respected navigators in maritime history.',
    discoveries: ['Eastern coast of Australia', 'Detailed Pacific charts', 'Hawaii expedition'],
    facts: ['Completed three major voyages.', 'Charts considered top of the 18th century.', 'Improved crew survival on long voyages.'],
    image: require('../../tuorsegemings/JamesCook.png'),
  },
  {
    id: 'dagama',
    name: 'Vasco da Gama',
    years: '1460 – 1524',
    origin: 'Portugal',
    era: 'Age of Exploration',
    arenas: ['Atlantic', 'Indian Ocean'],
    reachedAsia: true,
    worldTraveler: false,
    subtitle: 'Portuguese explorer of the sea route from Europe to India.',
    preview:
      'Portuguese explorer who in 1498 opened the direct sea route from Europe to India around the southern tip of Africa.',
    storyLong:
      'Vasco da Gama was a Portuguese explorer who opened a direct sea route between Europe and India. In 1498, his expedition successfully sailed around the southern tip of Africa and reached the Indian Ocean. This route transformed global trade by connecting European merchants directly with Asian markets.\n\nHis voyages helped Portugal become one of the leading maritime powers of the Age of Exploration. Da Gama\'s fleet crossed unfamiliar waters and relied on advanced navigation techniques for long-distance ocean travel. The expedition showed that regular trade routes could be maintained across multiple oceans.\n\nThe new sea connection increased the movement of spices, textiles, and valuable goods between continents. Vasco da Gama later returned to India as a representative of Portuguese interests overseas. His journeys played a major role in shaping early global trade networks.',
    discoveries: ['Sea route to India', 'Connection of Atlantic and Indian Oceans', 'Direct Portuguese trade with Asia'],
    facts: ['Reached India in 1498.', 'Rounded the Cape of Good Hope.', 'Returned to India as a Portuguese representative.'],
    image: require('../../tuorsegemings/VascoDaGama.png'),
  },
  {
    id: 'marcopolo',
    name: 'Marco Polo',
    years: '1254 – 1324',
    origin: 'Italy',
    era: 'Medieval',
    arenas: ['Land Asia'],
    reachedAsia: true,
    worldTraveler: false,
    subtitle: 'Venetian traveler who wrote about Asia and the Silk Road.',
    preview:
      'Venetian traveler and merchant whose journeys along the Silk Road introduced Europeans to distant cultures of Asia.',
    storyLong:
      'Marco Polo was a Venetian traveler and merchant whose journeys through Asia introduced many Europeans to distant cultures and regions. Traveling along trade routes connected to the Silk Road, he spent many years in the court of Kublai Khan in China. His stories later became some of the most famous travel accounts of the medieval world.\n\nAlthough Marco Polo traveled mainly by land rather than ocean voyages, his observations inspired later explorers and navigators. His writings described unfamiliar cities, trade systems, inventions, and cultural traditions that were largely unknown in Europe at the time. These detailed accounts encouraged curiosity about Asian trade and geography.\n\nHis travel book was copied and translated widely across Europe for centuries. Many explorers, including Christopher Columbus, later studied Polo\'s descriptions while planning their own expeditions. Marco Polo became one of history\'s most influential travelers and storytellers.',
    discoveries: ['Detailed account of the Silk Road', 'Descriptions of the Mongol court', 'Records of Asian cities'],
    facts: ['Spent years at Kublai Khan\'s court.', 'Inspired later navigators including Columbus.', 'His book spread widely across Europe.'],
    image: require('../../tuorsegemings/MarcoPolo.png'),
  },
  {
    id: 'vespucci',
    name: 'Amerigo Vespucci',
    years: '1454 – 1512',
    origin: 'Italy',
    era: 'Age of Exploration',
    arenas: ['Atlantic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Italian navigator who helped identify the new continents.',
    preview:
      'Italian navigator whose Atlantic voyages helped show that the western lands were separate continents.',
    storyLong:
      'Amerigo Vespucci was an Italian explorer and navigator who helped demonstrate that the newly reached western lands were separate continents rather than parts of Asia. Through several Atlantic voyages, he explored coastlines of South America and carefully recorded his observations. His writings became widely known across Europe.\n\nVespucci studied stars, navigation, and geography while documenting the regions visited during his expeditions. He described unfamiliar landscapes, large river systems, and cultures that differed greatly from Asian descriptions known in Europe. These observations helped geographers recognize the existence of an entirely different landmass.\n\nBecause of his contributions, mapmakers later used the name "America" in reference to the newly mapped continents. Vespucci\'s letters and travel accounts influenced early geographic studies during the Age of Exploration. His work became important for understanding the shape of the western hemisphere.',
    discoveries: ['South American coastline mapping', 'Recognition of new continents', 'Atlantic navigation records'],
    facts: ['America was later named after him.', 'Wrote influential letters describing Atlantic voyages.', 'Studied astronomy and navigation.'],
    image: require('../../tuorsegemings/AmerigoVespucci.png'),
  },
  {
    id: 'hudson',
    name: 'Henry Hudson',
    years: '1565 – 1611',
    origin: 'England',
    era: 'Age of Exploration',
    arenas: ['Arctic', 'North Atlantic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'English navigator seeking northern sea routes.',
    preview:
      'English navigator who explored northern coasts of North America in search of a shorter route to Asia.',
    storyLong:
      'Henry Hudson was an English navigator and explorer known for searching northern sea routes connecting Europe and Asia. During several expeditions, he explored parts of present-day Canada and the northeastern coast of North America. Rivers, bays, and regions discovered during his journeys were later named after him.\n\nHudson traveled through dangerous Arctic waters while searching for shorter trade passages. His expeditions contributed important information about coastlines, waterways, and navigation conditions in northern regions. Although the hoped-for trade route was never fully discovered, his maps became valuable for future explorers.\n\nOne of his most famous explorations led to the discovery of Hudson Bay. Harsh weather, ice, and difficult living conditions created serious challenges for his crews during long voyages. Hudson remains remembered as one of the important explorers of northern maritime history.',
    discoveries: ['Hudson Bay', 'Northern Canadian coastlines', 'Arctic navigation records'],
    facts: ['Bays, rivers and straits bear his name.', 'Travelled into dangerous Arctic waters.', 'Hoped to find a northern passage to Asia.'],
    image: require('../../tuorsegemings/HenryHudson.png'),
  },
  {
    id: 'zhenghe',
    name: 'Zheng He',
    years: '1371 – 1433',
    origin: 'China',
    era: 'Medieval',
    arenas: ['Indian Ocean'],
    reachedAsia: true,
    worldTraveler: false,
    subtitle: 'Chinese admiral of the Ming treasure fleets.',
    preview:
      'Chinese admiral whose massive Ming treasure fleets crossed Southeast Asia, India, Arabia and East Africa.',
    storyLong:
      'Zheng He was a Chinese admiral and explorer who commanded enormous maritime expeditions during the Ming Dynasty. Leading massive treasure fleets, he traveled across Southeast Asia, India, Arabia, and East Africa during the early fifteenth century. His voyages demonstrated the advanced shipbuilding and navigation abilities of China at the time.\n\nThe fleets carried merchants, diplomats, sailors, and valuable trade goods across long ocean routes. Zheng He\'s expeditions helped strengthen diplomatic relationships and cultural exchange between many regions connected by the Indian Ocean. His journeys became some of the largest naval expeditions in pre-modern history.\n\nUnlike many later exploration efforts focused mainly on territorial control, Zheng He\'s voyages often emphasized trade, diplomacy, and international contact. His expeditions showed the scale of maritime activity possible centuries before modern navigation technology. Today, he is remembered as one of the greatest naval explorers in Asian history.',
    discoveries: ['Indian Ocean maritime diplomacy', 'Trade links with East Africa', 'Ming treasure fleet voyages'],
    facts: ['Commanded huge multi-ship treasure fleets.', 'Reached as far as East Africa.', 'Focused on trade and diplomacy.'],
    image: require('../../tuorsegemings/ZhengHe.png'),
  },
  {
    id: 'dias',
    name: 'Bartolomeu Dias',
    years: '1450 – 1500',
    origin: 'Portugal',
    era: 'Age of Exploration',
    arenas: ['Atlantic', 'Indian Ocean'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Portuguese navigator who rounded the Cape of Good Hope.',
    preview:
      'Portuguese explorer who in 1488 became the first European to sail around the southern tip of Africa.',
    storyLong:
      'Bartolomeu Dias was a Portuguese explorer known for becoming the first European navigator to sail around the southern tip of Africa. During his voyage in 1488, he proved that the Atlantic and Indian Oceans were connected by sea. This discovery opened the possibility of direct maritime trade routes between Europe and Asia.\n\nDias faced violent storms and dangerous ocean conditions while traveling along the African coastline. His expedition reached the point later called the Cape of Good Hope, one of the most important locations in maritime navigation history. The voyage became a major step toward future expeditions to India and the East.\n\nAlthough Dias did not reach India himself, his discoveries helped later navigators such as Vasco da Gama complete longer trade routes. His expedition greatly expanded European geographic knowledge during the Age of Exploration. Bartolomeu Dias remains one of Portugal\'s most important maritime pioneers.',
    discoveries: ['Cape of Good Hope', 'Atlantic-Indian Ocean connection', 'African coast navigation'],
    facts: ['Sailed around southern Africa in 1488.', 'Faced violent storms on the African coast.', 'Paved the way for Vasco da Gama.'],
    image: require('../../tuorsegemings/BartolomeuDias.png'),
  },
  {
    id: 'leiferikson',
    name: 'Leif Erikson',
    years: '970 – 1020',
    origin: 'Norse',
    era: 'Medieval',
    arenas: ['North Atlantic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Norse explorer believed to have reached North America.',
    preview:
      'Norse explorer who, according to Icelandic sagas, sailed from Greenland to a region called Vinland in North America.',
    storyLong:
      'Leif Erikson was a Norse explorer believed to be among the first Europeans to reach North America centuries before Columbus. According to Icelandic sagas, he sailed west from Greenland and arrived in a region called Vinland, thought to be part of modern-day Newfoundland in Canada. His voyages became an important part of Viking exploration history.\n\nLeif traveled using advanced Viking navigation skills developed through generations of northern sea travel. His crew crossed rough Atlantic waters in wooden longships designed for difficult ocean conditions. These expeditions demonstrated the impressive maritime abilities of Norse sailors during the medieval period.\n\nArchaeological discoveries later supported stories about Viking presence in North America. Leif Erikson became one of the most famous figures connected to early Atlantic exploration. His journeys remain an important chapter in the history of long-distance sea travel.',
    discoveries: ['Vinland (likely Newfoundland)', 'North Atlantic Norse routes', 'Greenland-to-America voyages'],
    facts: ['Likely reached North America around 1000.', 'Sailed in Norse longships.', 'Mentioned in Icelandic sagas.'],
    image: require('../../tuorsegemings/LeifErikson.png'),
  },
  {
    id: 'tasman',
    name: 'Abel Tasman',
    years: '1603 – 1659',
    origin: 'Netherlands',
    era: 'Age of Exploration',
    arenas: ['Pacific'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Dutch navigator who mapped Tasmania and New Zealand.',
    preview:
      'Dutch explorer who mapped Tasmania and New Zealand for European charts during voyages of the Dutch East India Company.',
    storyLong:
      'Abel Tasman was a Dutch explorer best known for exploring regions of the South Pacific and discovering Tasmania and New Zealand for European maps. During voyages organized by the Dutch East India Company, he traveled across unfamiliar southern oceans searching for new trade opportunities and territories.\n\nTasman carefully mapped coastlines and islands encountered during his expeditions. His voyages improved European understanding of the Pacific region and helped expand navigation routes through southern waters. Although many areas remained unexplored, his maps became valuable references for later navigators.\n\nThe island of Tasmania was later named in his honor. Tasman\'s journeys represented some of the earliest large-scale European explorations of the southern Pacific Ocean. His work contributed greatly to global cartography during the seventeenth century.',
    discoveries: ['Tasmania', 'New Zealand coasts', 'South Pacific charts'],
    facts: ['Sailed for the Dutch East India Company.', 'Tasmania was named after him.', 'Helped expand southern ocean knowledge.'],
    image: require('../../tuorsegemings/AbelTasman.png'),
  },
  {
    id: 'elcano',
    name: 'Juan Sebastián Elcano',
    years: '1476 – 1526',
    origin: 'Spain',
    era: 'Age of Exploration',
    arenas: ['Atlantic', 'Pacific', 'Indian Ocean'],
    reachedAsia: true,
    worldTraveler: true,
    subtitle: 'Spanish navigator who finished the first circumnavigation.',
    preview:
      'Spanish navigator who completed the first circumnavigation of the Earth in 1522 after Magellan\'s death.',
    storyLong:
      'Juan Sebastián Elcano was a Spanish navigator who completed the first circumnavigation of the Earth after Ferdinand Magellan\'s death. As one of the surviving leaders of the expedition, he guided the remaining crew safely back to Spain in 1522. The journey became one of the greatest achievements in maritime exploration.\n\nThe expedition traveled across the Atlantic, Pacific, and Indian Oceans under extremely difficult conditions. Crew members faced storms, hunger, illness, and long periods without supplies. Elcano\'s leadership during the final stage of the voyage helped ensure the success of the historic expedition.\n\nCompleting the circumnavigation proved the practical possibility of global sea travel. The voyage also demonstrated the immense size of the world\'s oceans and changed geographic understanding in Europe. Elcano became recognized as one of history\'s important navigators.',
    discoveries: ['First completed circumnavigation', 'Three-ocean voyage route', 'Demonstration of global sea travel'],
    facts: ['Returned to Spain in 1522.', 'Took over after Magellan died.', 'Completed the first round-the-world voyage.'],
    image: require('../../tuorsegemings/JuanSebastinElcano.png'),
  },
  {
    id: 'drake',
    name: 'Francis Drake',
    years: '1540 – 1596',
    origin: 'England',
    era: 'Age of Exploration',
    arenas: ['Pacific', 'Atlantic'],
    reachedAsia: false,
    worldTraveler: true,
    subtitle: 'English navigator who circumnavigated the globe.',
    preview:
      'English sea captain whose voyage between 1577 and 1580 was one of the earliest successful circumnavigations.',
    storyLong:
      'Francis Drake was an English sea captain and explorer known for his voyages around the world during the sixteenth century. Between 1577 and 1580, he completed one of the earliest successful circumnavigations after Magellan\'s expedition. His travels increased England\'s presence in global maritime exploration.\n\nDrake explored coastlines across the Americas and Pacific Ocean while gathering navigation information and mapping new areas. His expeditions combined exploration, trade, and naval operations during a period of strong competition between European powers. He became one of the best-known English navigators of his era.\n\nHis voyages helped improve English maritime knowledge and long-distance sea navigation. Drake\'s expeditions contributed to the growing importance of naval exploration in world history. He remains a famous figure connected with the Age of Exploration.',
    discoveries: ['Pacific coastal routes', 'Second circumnavigation in history', 'New English maritime charts'],
    facts: ['Completed his circumnavigation 1577 to 1580.', 'Sailed under the English flag.', 'Mapped Pacific coastlines.'],
    image: require('../../tuorsegemings/FrancisDrake.png'),
  },
  {
    id: 'amundsen',
    name: 'Roald Amundsen',
    years: '1872 – 1928',
    origin: 'Norway',
    era: 'Modern Polar',
    arenas: ['Antarctic', 'Arctic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Norwegian explorer who reached the South Pole first.',
    preview:
      'Norwegian polar explorer who became the first to reach the South Pole in 1911 and pioneered Arctic navigation.',
    storyLong:
      'Roald Amundsen was a Norwegian explorer famous for polar expeditions and extreme environment navigation. In 1911, he became the first person to successfully reach the South Pole. His careful planning and survival strategies made his expeditions highly respected in exploration history.\n\nAmundsen also explored Arctic sea routes and studied navigation through icy northern waters. His expeditions relied on detailed preparation, experienced crews, and efficient travel methods suited for polar conditions. These journeys expanded scientific and geographic understanding of remote regions.\n\nHe later became involved in early aviation exploration connected to the Arctic. Amundsen\'s achievements made him one of the most successful polar explorers of the twentieth century. His expeditions demonstrated the importance of preparation and navigation skill in difficult environments.',
    discoveries: ['South Pole', 'Northwest Passage transit', 'Arctic aerial exploration'],
    facts: ['Reached the South Pole in 1911.', 'Sailed the entire Northwest Passage.', 'Pioneered polar survival planning.'],
    image: require('../../tuorsegemings/RoaldAmundsen.png'),
  },
  {
    id: 'cartier',
    name: 'Jacques Cartier',
    years: '1491 – 1557',
    origin: 'France',
    era: 'Age of Exploration',
    arenas: ['North Atlantic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'French navigator of the Gulf of Saint Lawrence.',
    preview:
      'French explorer who mapped the Gulf of Saint Lawrence and parts of present-day Canada during the 1500s.',
    storyLong:
      'Jacques Cartier was a French explorer known for exploring the Gulf of Saint Lawrence and parts of present-day Canada. During several voyages sponsored by France, he mapped rivers and coastal regions while searching for trade routes and valuable resources.\n\nCartier\'s expeditions provided France with important geographic knowledge about North America. He traveled deep into river systems and interacted with local communities during his journeys. His reports helped increase European interest in the northern regions of the continent.\n\nThe Saint Lawrence River later became one of the major waterways in North American history. Cartier\'s explorations contributed significantly to early French navigation and mapping efforts overseas. He remains one of the key figures in the exploration of Canada.',
    discoveries: ['Saint Lawrence River', 'Gulf of Saint Lawrence', 'Eastern Canadian coast'],
    facts: ['Sailed under the French flag.', 'Mapped the Gulf of Saint Lawrence.', 'Travelled deep into Canadian river systems.'],
    image: require('../../tuorsegemings/JacquesCartier.png'),
  },
  {
    id: 'pytheas',
    name: 'Pytheas of Massalia',
    years: '350 BC – 285 BC',
    origin: 'Ancient Greece',
    era: 'Ancient',
    arenas: ['North Atlantic'],
    reachedAsia: false,
    worldTraveler: false,
    subtitle: 'Ancient Greek explorer of the northern Atlantic.',
    preview:
      'Ancient Greek geographer whose voyage beyond the Mediterranean reached the northern Atlantic and Britain.',
    storyLong:
      'Pytheas was an ancient Greek explorer and geographer who traveled far beyond the Mediterranean world during the fourth century BC. He sailed through the Atlantic Ocean and described regions near northern Europe, including Britain and possibly Iceland or Scandinavia. His journeys became some of the earliest recorded scientific explorations of northern seas.\n\nPytheas carefully observed ocean tides, climate conditions, and astronomical patterns during his travels. His writings introduced many Mediterranean scholars to information about distant northern regions previously unknown to them. These observations later influenced ancient geography and navigation studies.\n\nAlthough many original texts were lost over time, later historians preserved descriptions of his voyages. Pytheas became remembered as one of the earliest explorers to combine travel with scientific observation. His expeditions helped expand geographic understanding in the ancient world.',
    discoveries: ['Northern Atlantic descriptions', 'Records of Britain', 'Early tide observations'],
    facts: ['Sailed from Massalia (Marseille).', 'Described Britain and possibly Iceland.', 'Studied ocean tides scientifically.'],
    image: require('../../tuorsegemings/PytheasOfMassalia.png'),
  },
];

export const getVoyagerById = (id: string) =>
  voyagerArchive.find(entry => entry.id === id);
