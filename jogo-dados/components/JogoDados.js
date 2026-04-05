"use client";
import { useState, useEffect } from "react";
import Dado from "./Dado";

export default function JogoDados() {
  // 🎲 Dados (2 por jogador)
  const [dados1, setDados1] = useState([null, null]);
  const [dados2, setDados2] = useState([null, null]);

  const [jogou1, setJogou1] = useState(false);
  const [jogou2, setJogou2] = useState(false);

  const [historico, setHistorico] = useState([]);

  // 🏆 Controle de jogo
  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);
  const [rodadas, setRodadas] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  function gerarNumero() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    if (fimDeJogo) return;

    const valores = [gerarNumero(), gerarNumero()];
    setDados1(valores);
    setJogou1(true);
  }

  function jogarJogador2() {
    if (fimDeJogo) return;

    const valores = [gerarNumero(), gerarNumero()];
    setDados2(valores);
    setJogou2(true);
  }

  function finalizarRodada(novosDados1, novosDados2) {
    const soma1 = novosDados1[0] + novosDados1[1];
    const soma2 = novosDados2[0] + novosDados2[1];

    let vencedor = "Empate";

    if (soma1 > soma2) {
      vencedor = "Jogador 1";
      setPlacar1((p) => p + 1);
    } else if (soma2 > soma1) {
      vencedor = "Jogador 2";
      setPlacar2((p) => p + 1);
    }

    const jogada = {
      dados1: novosDados1,
      dados2: novosDados2,
      soma1,
      soma2,
      vencedor,
    };

    setHistorico((prev) => [jogada, ...prev].slice(0, 5));

    setRodadas((r) => {
      const novaRodada = r + 1;

      if (novaRodada === 5) {
        setFimDeJogo(true);
      }

      return novaRodada;
    });

    setJogou1(false);
    setJogou2(false);
  }

  // ✅ Controla quando finalizar rodada
  useEffect(() => {
    if (jogou1 && jogou2) {
      finalizarRodada(dados1, dados2);
    }
  }, [jogou1, jogou2]);

  // 🏁 Resultado final
  let resultadoFinal = "";

  if (fimDeJogo) {
    if (placar1 > placar2) resultadoFinal = "🏆 Jogador 1 venceu!";
    else if (placar2 > placar1) resultadoFinal = "🏆 Jogador 2 venceu!";
    else resultadoFinal = "🤝 Empate geral!";
  }

  // 🔄 Reiniciar jogo
  function reiniciarJogo() {
    setDados1([null, null]);
    setDados2([null, null]);
    setHistorico([]);
    setPlacar1(0);
    setPlacar2(0);
    setRodadas(0);
    setFimDeJogo(false);
    setJogou1(false);
    setJogou2(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎲 Disputa de Dados</h2>

      <p>Rodada: {rodadas} / 5</p>
      <p>Placar: {placar1} x {placar2}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        <div>
          <h3>Jogador 1</h3>
          <Dado valor={dados1[0]} />
          <Dado valor={dados1[1]} />
          <br />
          <button onClick={jogarJogador1} disabled={fimDeJogo}>
            Jogar
          </button>
        </div>

        <div>
          <h3>Jogador 2</h3>
          <Dado valor={dados2[0]} />
          <Dado valor={dados2[1]} />
          <br />
          <button onClick={jogarJogador2} disabled={fimDeJogo}>
            Jogar
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>Histórico (últimas 5)</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {historico.map((j, i) => (
          <li key={i}>
            🎲 [{j.dados1[0]}, {j.dados1[1]}] ({j.soma1}) x{" "}
            [{j.dados2[0]}, {j.dados2[1]}] ({j.soma2}) →{" "}
            <strong>{j.vencedor}</strong>
          </li>
        ))}
      </ul>

      {fimDeJogo && (
        <div style={{ marginTop: 30 }}>
          <h2>{resultadoFinal}</h2>
          <button onClick={reiniciarJogo}>
            🔄 Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}