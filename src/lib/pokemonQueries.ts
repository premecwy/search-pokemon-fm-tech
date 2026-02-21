import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      image
      types
      classification
      resistant
      weaknesses
      maxHP
      maxCP
      fleeRate
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        number
        types
        image
      }
    }
  }
`;
