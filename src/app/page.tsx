"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client/react";
import SearchBar from "@/components/SearchBar";
import PokemonResult, { type PokemonData } from "@/components/PokemonResult";
import { GET_POKEMON } from "@/lib/pokemonQueries";
import styles from "./page.module.css";

type GetPokemonResult = {
  pokemon?: PokemonData;
};

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get("search") ?? "";

  const [inputValue, setInputValue] = useState(urlSearch);
  const [runSearch, { data, loading, error }] = useLazyQuery(GET_POKEMON, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    setInputValue(urlSearch);
    if (urlSearch) {
      runSearch({ variables: { name: urlSearch.toLowerCase() } });
    }
  }, [urlSearch, runSearch]);

  const handleSearch = useCallback((value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return;
    router.push(`/?search=${encodeURIComponent(trimmed)}`);
  }, [router]);

  const handleEvolutionClick = useCallback((name: string) => {
    const normalized = name.toLowerCase();
    router.push(`/?search=${encodeURIComponent(normalized)}`);
  }, [router]);

  const pokemonData = (data as GetPokemonResult | undefined)?.pokemon ?? null;
  const searched = urlSearch.length > 0;
  const notFound = searched && !loading && !error && !pokemonData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokémon search</h1>
        <SearchBar
          value={inputValue}
          onValueChange={setInputValue}
          onSearch={handleSearch}
        />
        <PokemonResult
          data={notFound ? null : pokemonData}
          loading={loading}
          error={error?.message ?? null}
          searchTerm={urlSearch}
          onEvolutionClick={handleEvolutionClick}
        />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className={styles.page}><main className={styles.main}><p>Loading…</p></main></div>}>
      <HomeContent />
    </Suspense>
  );
}
