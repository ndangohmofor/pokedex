import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pokeData } from "../interfaces/PokemonData";
import Button from "react-bootstrap/Button";

type location = {
  location_area: { name: string; url: string };
};

const PokemonDetail = () => {
  const { name, id } = useParams<string>();
  const navigate = useNavigate();
  const IMAGEBASEURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  const BASEIDURL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const BASENAMEURL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const LOCATIONURL = `${BASEIDURL}/encounters`;
  const [data, setData] = useState<pokeData>();
  const [pokeImage, setPokeImage] = useState(`${IMAGEBASEURL}/${id}.png`);
  const [location, setLocation] = useState<location[]>([]);

  const capitalize: Function = (str: string): string => {
    const lower: string = str.toLocaleLowerCase();
    return str.charAt(0).toLocaleLowerCase() + lower.slice(1);
  };

  useEffect(() => {
    const getPokemonDetails = async () => {
      const res = await axios.get(`${BASENAMEURL}`);
      setData(res.data);
    };
    getPokemonDetails();

    const getPokemonLocation = async () => {
      const res = await axios.get(LOCATIONURL);
      setLocation(res.data);
    };
    getPokemonLocation();
  }, [BASENAMEURL, LOCATIONURL]);

  const handleClick = async () =>
    await setPokeImage(
      pokeImage === `${IMAGEBASEURL}/${id}.png`
        ? `${IMAGEBASEURL}/back/${id}.png`
        : `${IMAGEBASEURL}/${id}.png`
    );

  return (
    <div className="poke-data">
      <div className="row" style={{ backgroundColor: "red" }}>
        <span>
          <img
            src="../../pokeLogo.png"
            alt="logo"
            id="left-wing"
            style={{
              width: "100px",
              height: "30px",
              objectFit: "scale-down",
              position: "absolute",
              left: "0vh",
            }}
          />
          <input
            type={"text"}
            placeholder="Search"
            className="center"
            style={{ display: "flow" }}
            disabled={true}
          />
        </span>
      </div>
      <div>
        <h1>{capitalize(name)}</h1>
        {
          <img
            src={pokeImage}
            alt={name}
            className="img-fluid"
            onClick={handleClick}
          />
        }
      </div>
      <div className="abilities">
        <h3 className="heading">Abilities</h3>
        {data?.abilities?.map((ability) => {
          return (
            <div className="group" key={ability.ability.name}>
              <h4>{ability.ability.name}</h4>
            </div>
          );
        })}
      </div>
      <div className="stat">
        <h3 className="heading">Stats</h3>
        {data?.stats?.map((pokemon) => {
          return (
            <h4 className="text-capitalize" key={pokemon?.stat?.name}>
              {capitalize(pokemon?.stat?.name)}: {pokemon?.base_stat}
            </h4>
          );
        })}
        <h4>Height: {data?.height}</h4>
        <h4>Weight: {data?.weight}</h4>
      </div>
      <div className="locations">
        <h3 className="heading">Locations</h3>
        {location ? (
          location.map((loc) => {
            return (
              <h4 className="text-capitalize" key={loc?.location_area?.name}>
                {loc?.location_area?.name}
              </h4>
            );
          })
        ) : (
          <h4 className="text-capitalize">Unknown Location</h4>
        )}
      </div>
      <div className="btn">
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
export default PokemonDetail;
