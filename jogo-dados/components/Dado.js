export default function Dado({ valor }) {
  let imagem = "/ImgDados/Dados1.png"; // padrão (não jogado)

  if (valor !== null) {
    imagem = `/ImgDados/Dados${valor + 1}.png`;
  }

  return (
    <img
      src={imagem}
      alt="Dado"
      style={{ width: 80, height: 80 }}
    />
  );
}