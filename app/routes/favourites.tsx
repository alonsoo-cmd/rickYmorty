import type { Route } from "./+types/home";
import { useState, useRef, useEffect } from "react";
import { useCharactersStore } from "~/stores/characters-store";
import { useNavigate } from "react-router";

export default function Favourites() {
    const { favourites, error, toggleFavourite, loadFavourites } = useCharactersStore();
    const navigate = useNavigate();

    useEffect(() => {
        loadFavourites();
    }, []);

    const favCount = favourites.length;

    return (
        <>
            {error && (
                <p style={{ color: "#D85A30", fontSize: "13px", marginBottom: "1rem" }}>
                    ⚠ {error}
                </p>
            )}
            {favCount > 0 ?
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {favourites.map((character) => (
                        <li key={character.id} style={{
                            background: character.favourite ? "#E1F5EE" : "white",
                            border: character.favourite ? "1px solid #1D9E75" : "1px solid #e0e0e0",
                            borderRadius: "12px", padding: "14px 18px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            transition: "all 0.2s"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div style={{
                                    width: "42px", height: "42px", borderRadius: "50%",
                                    background: character.favourite ? "#1D9E75" : "#9FE1CB",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 700, fontSize: "13px", // ← CAMBIO 1: añadido fontSize
                                    color: character.favourite ? "#E1F5EE" : "#0F6E56"
                                }}>
                                    {character.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()} {/* ← CAMBIO 2: iniciales */}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{character.name}</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}> {/* ← CAMBIO 3: fila con badge */}
                                        <span style={{
                                            fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px",
                                            background: character.status === "Alive" ? "#E1F5EE" : character.status === "Dead" ? "#FAECE7" : "#F1EFE8",
                                            color: character.status === "Alive" ? "#0F6E56" : character.status === "Dead" ? "#993C1D" : "#5F5E5A",
                                        }}>
                                            {character.status}
                                        </span>
                                        <span style={{ fontSize: "12px", color: character.favourite ? "#0F6E56" : "#888" }}>
                                            {character.favourite ? "★ Favorito" : `#${character.id}`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => toggleFavourite(character.id)} style={{
                                background: character.favourite ? "#1D9E75" : "#f5f5f5",
                                border: character.favourite ? "1px solid #0F6E56" : "1px solid #ddd",
                                borderRadius: "20px", // ← CAMBIO 4: píldora
                                padding: "7px 14px",
                                color: character.favourite ? "#E1F5EE" : "#555",
                                fontWeight: 600, cursor: "pointer", fontSize: "13px"
                            }}>
                                {character.favourite ? "★ Favorito" : "☆ Favorito"}
                            </button>
                        </li>
                    ))}
                </ul>
                :
                <p style={{
                    marginTop: "1rem",
                    fontSize: "13px",
                    color: "#888"
                }}>
                    Ningún personaje marcado aún
                </p>
            }
            <button
                onClick={() => navigate("/")}
                style={{
                    marginTop: "12px",
                    background: "#1D9E75",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "15px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s"
                }}
            >
                Volver al menu principal
            </button>
        </>
    );
}