export interface PlanetData {
  id: string;
  name: string;
  diameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  color: string;
  glowColor: string;
  orbitRadius: number; // px for display
  size: number; // px for display
  description: string;
  moons: number;
  type: string;
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: '#b5b5b5',
    glowColor: '#8a8a8a',
    orbitRadius: 70,
    size: 8,
    description: 'The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.',
    moons: 0,
    type: 'Terrestrial',
  },
  {
    id: 'venus',
    name: 'Venus',
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: '#e8cda0',
    glowColor: '#d4a854',
    orbitRadius: 105,
    size: 12,
    description: 'The hottest planet with a thick toxic atmosphere. It rotates in the opposite direction to most planets.',
    moons: 0,
    type: 'Terrestrial',
  },
  {
    id: 'earth',
    name: 'Earth',
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    color: '#4da6ff',
    glowColor: '#2d8bdb',
    orbitRadius: 145,
    size: 13,
    description: 'Our home planet — the only known world with liquid water on its surface and life.',
    moons: 1,
    type: 'Terrestrial',
  },
  {
    id: 'mars',
    name: 'Mars',
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: '#e07040',
    glowColor: '#c0502a',
    orbitRadius: 190,
    size: 10,
    description: 'The Red Planet, known for its iron oxide surface. Home to the tallest volcano in the solar system.',
    moons: 2,
    type: 'Terrestrial',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    diameter: 142984,
    distanceFromSun: 778.6,
    orbitalPeriod: 4333,
    color: '#d4a574',
    glowColor: '#b8834a',
    orbitRadius: 255,
    size: 28,
    description: 'The largest planet, a gas giant with a Great Red Spot storm that has raged for centuries.',
    moons: 95,
    type: 'Gas Giant',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    diameter: 120536,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10759,
    color: '#e8d5a0',
    glowColor: '#c4a860',
    orbitRadius: 320,
    size: 24,
    description: 'Famous for its stunning ring system made of ice and rock. It could float in water if there were a bathtub big enough.',
    moons: 146,
    type: 'Gas Giant',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    diameter: 51118,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30687,
    color: '#7de8e8',
    glowColor: '#4dc8c8',
    orbitRadius: 380,
    size: 18,
    description: 'An ice giant that rotates on its side. It has a faint ring system and extreme seasons lasting 20+ years.',
    moons: 28,
    type: 'Ice Giant',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    diameter: 49528,
    distanceFromSun: 4495.1,
    orbitalPeriod: 60190,
    color: '#4466ff',
    glowColor: '#2244dd',
    orbitRadius: 430,
    size: 17,
    description: 'The windiest planet with speeds over 2,000 km/h. It was the first planet found by mathematical prediction.',
    moons: 16,
    type: 'Ice Giant',
  },
];

export const sunData = {
  name: 'The Sun',
  diameter: 1392700,
  type: 'G-type Main-Sequence Star',
  temperature: '5,500°C (surface)',
  description: 'Our star — a nearly perfect sphere of hot plasma. It contains 99.86% of the total mass of the Solar System.',
  age: '4.6 billion years',
};
