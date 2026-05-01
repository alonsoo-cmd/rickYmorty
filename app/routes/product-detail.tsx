import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface CharacterDetail {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
    location: { name: string };
    image: string;
    episode: string[];
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [character, setCharacter] = useState<CharacterDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                // Suponiendo que la API de Rick y Morty está mapeada en /api/character/
                const response = await fetch(`/api/character/${id}`);
                
                if (!response.ok) {
                    throw new Error("No se pudo cargar la información del personaje.");
                }
                
                const data = await response.json();
                setCharacter(data);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los detalles del personaje.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharacterDetails();
        }
    }, [id]);

    if (loading) {
        return <p style={{ fontSize: "15px", color: "#555", textAlign: "center", marginTop: "2rem" }}>Cargando detalles...</p>;
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <p style={{ color: "#D85A30", fontSize: "14px", marginBottom: "1rem", fontWeight: 600 }}>⚠ {error}</p>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        background: "#f5f5f5", color: "#555", border: "1px solid #ddd",
                        borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: 600
                    }}
                >
                    Volver atrás
                </button>
            </div>
        );
    }

    if (!character) return null;

    return (
        <div style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
                <img 
                    src={character.image} 
                    alt={character.name} 
                    style={{ 
                        width: "100%", 
                        maxWidth: "250px", 
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }} 
                />
                
                <div style={{ flex: 1, minWidth: "200px" }}>
                    <h2 style={{ margin: "0 0 12px 0", fontSize: "28px", color: "#333" }}>
                        {character.name}
                    </h2>
                    
                    <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                        <span style={{
                            fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px",
                            background: character.status === "Alive" ? "#E1F5EE" : character.status === "Dead" ? "#FAECE7" : "#F1EFE8",
                            color: character.status === "Alive" ? "#0F6E56" : character.status === "Dead" ? "#993C1D" : "#5F5E5A",
                        }}>
                            {character.status}
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: "#f0f0f0", color: "#555" }}>
                            {character.species}
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: "#f0f0f0", color: "#555" }}>
                            {character.gender}
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px", color: "#444" }}>
                        <div>
                            <span style={{ fontWeight: 700, color: "#888", fontSize: "13px", display: "block" }}>Origen</span>
                            {character.origin.name}
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, color: "#888", fontSize: "13px", display: "block" }}>Ubicación actual</span>
                            {character.location.name}
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, color: "#888", fontSize: "13px", display: "block" }}>Apariciones</span>
                            {character.episode.length} episodio(s)
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }} />

            <button
                onClick={() => navigate(-1)}
                style={{
                    alignSelf: "flex-start",
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
                ← Volver
            </button>
        </div>
    );
}