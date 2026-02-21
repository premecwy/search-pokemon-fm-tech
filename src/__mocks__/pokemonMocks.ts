/**
 * Test mocks for Pokémon data (matches GraphQL pokemon shape).
 */

export const mockBulbasaur = {
  id: "bulbasaur-id",
  number: "001",
  name: "Bulbasaur",
  types: ["Grass", "Poison"],
};

export const mockCharmander = {
  id: "charmander-id",
  number: "004",
  name: "Charmander",
  types: ["Fire"],
};

export const mockSquirtle = {
  id: "squirtle-id",
  number: "007",
  name: "Squirtle",
  types: ["Water"],
};

export const pokemonMocks = [mockBulbasaur, mockCharmander, mockSquirtle] as const;
