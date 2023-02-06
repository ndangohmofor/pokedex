import { useEffect, useState } from "react";
import PokemonCollection from "./PokemonCollection";
import axios from "axios";
import { PokemonInterface } from "../interfaces/PokemonData";

const FetchData: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInterface[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [prevUrl, setPrevUrl] = useState<string>("");

  useEffect(() => {
    const fetchPoke = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
      );

      if (res.data.next) {
        setNextUrl(res.data.next);
      }
      if (res.data.previous) {
        setPrevUrl(res.data.previous);
      }

      res.data.results.forEach((pokemon: PokemonInterface) => {
        setPokemonList((state) => [...state, pokemon]);
      });
    };
    fetchPoke();
  }, []);

  const handleNext = async () => {
    setPokemonList([]);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    res.data.results.forEach((pokemon: PokemonInterface) =>
      setPokemonList((state) => [...state, pokemon])
    );
  };

  const handlePrev = async () => {
    setPokemonList([]);
    const res = await axios.get(prevUrl);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    res.data.results.forEach((pokemon: PokemonInterface) =>
      setPokemonList((state) => [...state, pokemon])
    );
  };

  return (
    <PokemonCollection
      pokemonList={pokemonList}
      next={nextUrl}
      previous={prevUrl}
      handleNext={handleNext}
      handlePrevious={handlePrev}
      setPokemonList={setPokemonList}
    />
  );
};
export default FetchData;
