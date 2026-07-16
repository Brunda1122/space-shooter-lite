import "./App.css";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import scoreBoard from "./components/scoreBoard";
import Controls from "./components/Controls";
import Laser from "./components/Laser";  
import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [shipPosition, setShipPosition] = useState(1);

  const [enemies, setEnemies] = useState([
    { id: 1, lane: 0, top: 40 },
    { id: 2, lane: 1, top: 40 },
    { id: 3, lane: 2, top: 40 },
  ]);

  const [laserVisible, setLaserVisible] = useState(false);
  const [laserY, setLaserY] = useState(100); 

  const moveLeft = () => {
    if (shipPosition > 0) setShipPosition(shipPosition - 1);
  };

  const moveRight = () => {
    if (shipPosition < 2) setShipPosition(shipPosition + 1);
  };

  const shoot = () => {
    if (laserVisible) return; 
    setLaserVisible(true);
    setLaserY(100); // start laser from ship position
  };

  const GameOver = time === 0;

  const restartGame = () => {
    setScore(0);
    setTime(60);
    setLaserVisible(false);
    setLaserY(100);
    setShipPosition(1);
    setEnemies([
      { id: 1, lane: 0, top: 40 },
      { id: 2, lane: 1, top: 40 },
      { id: 3, lane: 2, top: 40 },
    ]);
  };

  // Laser movement
  useEffect(() => {
    if (!laserVisible) return;
    const interval = setInterval(() => {
      setLaserY((prev) => prev - 10);
    }, 40);
    return () => clearInterval(interval);
  }, [laserVisible]);

  // Reset laser when off screen
  useEffect(() => {
    if (laserY < 0) {
      setLaserVisible(false);
      setLaserY(100);
    }
  }, [laserY]);

  // Enemy movement
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prev) =>
        prev.map((enemy) => ({
          ...enemy,
          top: enemy.top > 420 ? 40 : enemy.top + 5,
          lane: enemy.top > 420 ? Math.floor(Math.random() * 3) : enemy.lane,
        }))
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Collision detection
  useEffect(() => {
    if (!laserVisible) return;

    enemies.forEach((enemy) => {
      const enemyBottom = enemy.top + 40;
      if (
        enemy.lane === shipPosition &&
        laserY > enemy.top &&
        laserY < enemyBottom
      ) {
        setScore((prev) => prev + 1);
        setLaserVisible(false);
        setLaserY(100);
        setEnemies((prev) =>
          prev.map((e) =>
            e.id === enemy.id
              ? { ...e, top: 40, lane: Math.floor(Math.random() * 3) }
              : e
          )
        );
      }
    });
  }, [laserY, enemies, shipPosition, laserVisible]);

  return (
    <div className="app">
      <Header />
      <ScoreBoard score={score} time={time} />
      <GameBoard
        shipPosition={shipPosition}
        enemies={enemies}
        laserVisible={laserVisible}
      />

      {laserVisible && (
        <Laser shipPosition={shipPosition} laserY={laserY} />
      )}

      {GameOver && <GameOver restartGame={restartGame} />}

      {!GameOver && (
        <Controls moveLeft={moveLeft} moveRight={moveRight} shoot={shoot} />
      )}
    </div>
  );
}

export default App;
