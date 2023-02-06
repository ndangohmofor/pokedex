export interface PokemonInterface {
  name: string;
  url: string;
}

interface givenStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface ability {
  ability: any;
  name: string;
  url?: string;
  is_hidden: boolean;
}

interface move {
  name: string;
  url?: string;
}

interface type {
  name: string;
  url: string;
}

export interface pokeData {
  abilities: ability[];
  base_experience: number;
  height: number;
  weight: number;
  id: number;
  name: string;
  types: { type: type }[];
  moves: move[];
  front_default: string;
  back_default: string;
  stats: givenStat[];
}
