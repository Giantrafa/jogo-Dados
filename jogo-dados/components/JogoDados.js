"use client";
import { useState } from "react";
import Dado from "./Dado";

export default function JogoDados() {
  const [dado1, setDado1] = useState(null);
  const [dado2, setDado2] = useState(null);

  const [jogou1, setJogou1] = useState(false);
  const [jogou2, setJogou2] = useState(false);

  const [historico, setHistorico] = useState([]);

  function gerarNumero() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    const valor = gerarNumero();
    setDado1(valor);
    setJogou1(true);
  }

  function jogarJogador2() {
    const valor = gerarNumero();
    setDado2(valor);
    setJogou2(true);
  }

  function finalizarRodada(novoDado1, novoDado2) {
    let vencedor = "Empate";

    if (novoDado1 > novoDado2) vencedor = "Jogador 1";
    else if (novoDado2 > novoDado1) vencedor = "Jogador 2";

    const jogada = {
      dado1: novoDado1,
      dado2: novoDado2,
      vencedor,
    };

    setHistorico((prev) => [jogada, ...prev].slice(0, 5));

    setJogou1(false);
    setJogou2(false);
  }

  if (jogou1 && jogou2) {
    finalizarRodada(dado1, dado2);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎲 Disputa de Dados</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        <div>
          <h3>Jogador 1</h3>
          <Dado valor={dado1} />
          <br />
          <button onClick={jogarJogador1}>Jogar</button>
        </div>

        <div>
          <h3>Jogador 2</h3>
          <Dado valor={dado2} />
          <br />
          <button onClick={jogarJogador2}>Jogar</button>
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>Histórico (últimas 5)</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {historico.map((j, i) => (
          <li key={i}>
            🎲 {j.dado1} x {j.dado2} → <strong>{j.vencedor}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}