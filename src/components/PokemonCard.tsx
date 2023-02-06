import axios from "axios";
import React, { useState, useEffect } from "react";
import { pokeData } from "../interfaces/PokemonData";
import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  id: string;
}

const PokemonCard: React.FC<Props> = (props) => {
  const { name, id } = props;

  const IMAGEBASEURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

  const [data, setData] = useState<pokeData>();
  const [pokeImage, setPokeImage] = useState(`${IMAGEBASEURL}/${id}.png`);

  const handleClick = () =>
    setPokeImage(
      pokeImage === `${IMAGEBASEURL}/${id}.png`
        ? `${IMAGEBASEURL}/back/${id}.png`
        : `${IMAGEBASEURL}/${id}.png`
    );

  const capitalize: Function = (str: string): string => {
    const lower: string = str.toLocaleLowerCase();
    return str.charAt(0).toLocaleLowerCase() + lower.slice(1);
  };

  useEffect(() => {
    const getPokemonDetails = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setData(res.data);
    };
    getPokemonDetails();
  }, [name]);

  return (
    <div className={`pokemon-list-container ${data?.types[0].type.name}`}>
      <section className={`${data?.types[0].type.name}`}>
        <p className="pokemon-name">#{`${id}`}</p>
        <p className="pokemon-name">
          <NavLink to={`${name}/${id}`}>{`${capitalize(name)}`}</NavLink>
        </p>
        <img src={pokeImage} alt={`${name}`} onClick={handleClick} />
        <p className="pokemon-name">{`Type: ${data?.types[0].type.name}`}</p>
      </section>
    </div>
  );
};
export default PokemonCard;
