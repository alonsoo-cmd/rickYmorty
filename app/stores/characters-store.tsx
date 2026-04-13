import { create } from "zustand";
import type { Character } from "../models/Character";

interface CharacterState{
    characters: Character[];
    error: string | null;
    favourites: Character[];
    searchCharacters: (searchTerm: string) => Promise<void>;
    toggleFavourite: (id: number) => void;
    loadFavourites: () => void;
}

async function fetchCharacters(searchTerm: string): Promise<Character[]> {
    try {
        const url = `/api/character/?name=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);

        // 1. Validar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        // 2. Comprobar que 'results' sea efectivamente un array
        if (data && Array.isArray(data.results)) {
            return data.results;
        }

        return [];
    } catch (error) {
        // 3. Manejar errores de red (p. ej. sin internet) o de parseo JSON
        console.error("Error fetching characters:", error);
        return [];
    }
}

export const useCharactersStore = create<CharacterState>((set, get) => ({
    characters: [],
    error: null,
    favourites: [],
    searchCharacters: async (searchTerm: string) => {
        set({ characters: [], error: null });
        try {
            const { favourites } = get();
            const charactersList = await fetchCharacters(searchTerm);
            const characters = charactersList.map((c: Character) => ({
                ...c,
                favourite: favourites.some((fav: Character) => fav.id === c.id),
            }));
            set({ characters });
        } catch (error) {
            console.error(error);
            set({ error: "Error al buscar libros" });
        }
    },
    loadFavourites: () => {
        if (typeof window === "undefined") return; 
        const saved = localStorage.getItem("favourites");
        const favourites: Character[] = saved ? JSON.parse(saved) : [];
        set({ favourites });
    },
    toggleFavourite: (id: number) => {
        const { characters, favourites} = get();

        const updatedCharacters = characters.map((c) =>
            c.id === id ? {...c, favourite: !c.favourite}: c
        );

        const isAlreadyFav = favourites.some((f) => f.id === id);
        const updatedFavourites = isAlreadyFav
            ? favourites.filter((f) => f.id !== id)
            : [...favourites, characters.find((c) => c.id === id)!];

        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

        set({ characters: updatedCharacters, favourites: updatedFavourites });
    },
}));
