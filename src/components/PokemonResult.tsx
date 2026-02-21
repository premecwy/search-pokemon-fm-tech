"use client";

import { memo } from "react";
import styles from "./PokemonResult.module.css";

export type Attack = {
  name: string;
  type: string;
  damage: number;
};

export type Evolution = {
  id: string;
  name: string;
  number: string;
  types?: string[] | null;
};

export type PokemonData = {
  id: string;
  number: string;
  name: string;
  attacks?: {
    fast?: Attack[] | null;
    special?: Attack[] | null;
  } | null;
  evolutions?: Evolution[] | null;
} | null;

type Props = {
  data: PokemonData;
  loading: boolean;
  error?: string | null;
  searchTerm?: string;
  onEvolutionClick: (name: string) => void;
};

function PokemonResult({
  data,
  loading,
  error,
  searchTerm = "",
  onEvolutionClick,
}: Props) {
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.message}>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.notFound}>
          No Pokémon found for &apos;{searchTerm || "that name"}&apos;
        </p>
      </div>
    );
  }

  const fast = data.attacks?.fast ?? [];
  const special = data.attacks?.special ?? [];
  const evolutions = data.evolutions ?? [];

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{data.name}</h2>
      <p className={styles.number}>#{data.number}</p>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Attacks</h3>
        {fast.length > 0 && (
          <div className={styles.attackGroup}>
            <h4 className={styles.attackLabel}>Fast</h4>
            <ul className={styles.list}>
              {fast.map((a, i) => (
                <li key={i} className={styles.attackItem}>
                  {a.name} ({a.type}) — {a.damage} damage
                </li>
              ))}
            </ul>
          </div>
        )}
        {special.length > 0 && (
          <div className={styles.attackGroup}>
            <h4 className={styles.attackLabel}>Special</h4>
            <ul className={styles.list}>
              {special.map((a, i) => (
                <li key={i} className={styles.attackItem}>
                  {a.name} ({a.type}) — {a.damage} damage
                </li>
              ))}
            </ul>
          </div>
        )}
        {fast.length === 0 && special.length === 0 && (
          <p className={styles.muted}>No attacks data</p>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Evolutions</h3>
        {evolutions.length > 0 ? (
          <ul className={styles.evoList}>
            {evolutions.map((evo) => (
              <li key={evo.id}>
                <button
                  type="button"
                  className={styles.evoLink}
                  onClick={() => onEvolutionClick(evo.name)}
                >
                  {evo.name}
                  {evo.types?.length ? ` (${evo.types.join(", ")})` : ""}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.muted}>No evolutions</p>
        )}
      </section>
    </div>
  );
}

export default memo(PokemonResult);
