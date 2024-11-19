import { useState } from "react";

const square = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function Squares() {
  const [squares] = useState(square);
  const [clicked, setClicked] = useState([]); // Tıklanan kareler
  const [winner, setWinner] = useState(null); // Kazanan kare
  const [score, setScore] = useState(0); // Kullanıcının puanı
  const [guess, setGuess] = useState(null); // Kullanıcının tıkladığı kare

  const getClassName = (id) => {
    if (winner && winner !== id) return 'square square-inactive';
    if (winner === id) return 'square square-winner';
    if (clicked.includes(id)) return 'square square-clicked';
    return 'square';
  };

  const handleSquareClick = (id) => {
    if (!clicked.includes(id) && !winner) { // Eğer kazanan belirlendiyse tıklama engellenir
      setClicked((prev) => [...prev, id]);
      setGuess(id); // Kullanıcının tahminini güncelle
      const randomWinner = squares[Math.floor(Math.random() * squares.length)];
      setWinner(randomWinner);

      // Tahmin doğruysa puanı artır
      if (id === randomWinner) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const resetGame = () => {
    setClicked([]); // Tıklanan kareleri sıfırla
    setWinner(null); // Kazananı sıfırla
    setGuess(null); // Tahmini sıfırla
  };

  return (
    <div className="container">
      <h2>Tahmin et hangi kare?</h2>
      <div className="squares">
        {squares.map((id) => (
          <div
            key={id}
            className={getClassName(id)}
            onClick={() => handleSquareClick(id)} // Tıklamalar burada kontrol ediliyor
          >
            {id}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Yeniden Başlat</button>
      <div>
        <h3>Puanınız: {score}</h3>
        {winner && (
          <h3>
            Kazanan: {winner} {guess === winner ? "(Doğru Tahmin!) 🎉" : "(Yanlış Tahmin) 😞"}
          </h3>
        )}
      </div>
    </div>
  );
}
