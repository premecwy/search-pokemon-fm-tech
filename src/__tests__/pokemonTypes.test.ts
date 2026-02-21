import { mockBulbasaur, mockCharmander, mockSquirtle } from "@/__mocks__/pokemonMocks";

describe("Pokémon types", () => {
  it("Bulbasaur has type Grass", () => {
    expect(mockBulbasaur.types).toContain("Grass");
  });

  it("Charmander has type Fire", () => {
    expect(mockCharmander.types).toContain("Fire");
  });

  it("Squirtle has type Water", () => {
    expect(mockSquirtle.types).toContain("Water");
  });
});

describe("Pokémon have correct types (it.each)", () => {
  const cases: Array<[string, string, { name: string; types: string[] }]> = [
    ["Bulbasaur", "Grass", mockBulbasaur],
    ["Charmander", "Fire", mockCharmander],
    ["Squirtle", "Water", mockSquirtle],
  ];

  it.each(cases)("%s has type %s", (_name, expectedType, pokemon) => {
    expect(pokemon.types).toContain(expectedType);
  });
});
