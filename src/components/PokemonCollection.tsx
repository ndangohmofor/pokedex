import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { PokemonInterface } from "../interfaces/PokemonData";
import PokemonCard from "./PokemonCard";
import Button from "react-bootstrap/Button";

interface Props {
  pokemonList: PokemonInterface[];
  next: string;
  previous: string;
  handleNext: MouseEventHandler;
  handlePrevious: MouseEventHandler;
  setPokemonList: React.Dispatch<React.SetStateAction<PokemonInterface[]>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const {
    pokemonList,
    next,
    previous,
    handleNext,
    handlePrevious,
    setPokemonList,
  } = props;

  const [displayList, setDisplayList] = useState<PokemonInterface[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayList(
      pokemonList.filter((pokemon) =>
        pokemon.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      )
    );
  };

  useEffect(() => {
    setDisplayList(pokemonList);
  }, [pokemonList]);

  return (
    <>
      <div className="row" style={{ backgroundColor: "red" }}>
        <span>
          <img
            src="pokeLogo.png"
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
            onChange={(e) => handleChange(e)}
          />
        </span>
      </div>
      <h1>PokeDex - Get'em All</h1>
      <section className="collection-container">
        {displayList.map((pokemon) => {
          const id = pokemon.url.match("/([^/]*)/$")![1];
          return (
            <>
              <PokemonCard key={pokemon.name} name={pokemon.name} id={id} />
            </>
          );
        })}
      </section>
      <div>
        <span>
          {previous && (
            <Button variant="primary" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <br />
          <br />
          {next && (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </span>
      </div>
    </>
  );
};
export default PokemonCollection;
