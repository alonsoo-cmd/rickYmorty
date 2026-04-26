import { Outlet } from "react-router";

export default function Home() {
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "1.25rem" }}>
        Personajes <span style={{ color: "#1D9E75" }}>Rick y Morty</span>
      </h1>
      <Outlet />
    </div>
  );
}
