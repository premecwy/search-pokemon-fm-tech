"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client/react";
import SearchBar from "@/components/SearchBar";
import PokemonResult, { type PokemonData } from "@/components/PokemonResult";
import { GET_POKEMON } from "@/lib/pokemonQueries";
import { loadRecents, saveRecent } from "@/lib/recentSearches";
import styles from "./HomeClient.module.css";

type GetPokemonResult = { pokemon?: PokemonData };

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get("search") ?? "";

  const [inputValue, setInputValue] = useState(urlSearch);
  const [recents, setRecents] = useState<string[]>([]);
  const [runSearch, { data, loading, error }] = useLazyQuery<GetPokemonResult>(
    GET_POKEMON,
    { fetchPolicy: "cache-and-network" }
  );

  useEffect(() => {
    const stored = loadRecents();
    setRecents(stored);

    if (!urlSearch && stored.length > 0) {
      router.replace(`/?search=${encodeURIComponent(stored[0])}`);
    }
  }, []);

  useEffect(() => {
    setInputValue(urlSearch);
    if (urlSearch) runSearch({ variables: { name: urlSearch.toLowerCase() } });
  }, [urlSearch, runSearch]);

  const handleSearch = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return;
    saveRecent(trimmed);
    setRecents(loadRecents());
    router.push(`/?search=${encodeURIComponent(trimmed)}`);
  };

  const handleEvolutionClick = (name: string) => {
    const normalized = name.toLowerCase();
    saveRecent(normalized);
    setRecents(loadRecents());
    router.push(`/?search=${encodeURIComponent(normalized)}`);
  };

  const pokemonData = data?.pokemon ?? null;
  const searched = urlSearch.length > 0;
  const notFound = searched && !loading && !error && !pokemonData;

  return (
    <>
      <SearchBar value={inputValue} onValueChange={setInputValue} onSearch={handleSearch} />
      {recents.length > 0 && (
        <div className={styles.recentsWrapper}>
          <p className={styles.recentsLabel}>Recent searches</p>
          <div className={styles.recentsList}>
            {recents.map((term) => (
              <button
                key={term}
                type="button"
                className={styles.recentsChip}
                onClick={() =>
                  router.push(`/?search=${encodeURIComponent(term)}`)
                }
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      <PokemonResult
        data={notFound ? null : pokemonData}
        loading={loading}
        error={error?.message ?? null}
        searchTerm={urlSearch}
        onEvolutionClick={handleEvolutionClick}
      />
    </>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <HomeContent />
    </Suspense>
  );
}