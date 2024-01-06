import { useState } from "react";

export default function Board() {
  const [boardValues, setBoardValues] = useState(Array(9).fill(null));
  const [boardValuesCopy,setBoardValuesCopy]=useState([]);
  const [typeX, setTypeX] = useState(true);
  const [player, setPlayer] = useState("پروفسور محمد");
  const [count, setCount] = useState(1);
  const [gameSnapShot, setGameSnapShot] = useState([{ id: 0, text: "شروع بازی", boardStatus: boardValues, player: player }]);
  const [winner, setWinner] = useState(null);
  function clickHandler(index) {
    if (boardValues[index]|| winner) {
      return null;
    }
 

    const newArray = [...boardValues];
    if (typeX) {
      newArray[index] = "X";
      setPlayer("  داش کیوان");
    } else {
      newArray[index] = "O";
      setPlayer("پروفسور محمد");
    }
    setBoardValues(newArray);
    setBoardValuesCopy(newArray);
    setTypeX(!typeX);
    setCount(count + 1);
    const movement = { id: count, text: `حرکت ${count}`, boardStatus: newArray, player: typeX ? "  داش کیوان" : "پروفسور محمد" };
    const gameSnapShotCopy = gameSnapShot.slice(0, count);
    gameSnapShotCopy.push(movement);
    setGameSnapShot(gameSnapShotCopy);
  }
  const gameSnapShotList = gameSnapShot.map((snapshot) => {
    return (
      <li key={snapshot.id} onClick={() => goToSnapshot(snapshot.id)}>
        {snapshot.text}
      </li>
    );
  });

  function goToSnapshot(i) {
    setBoardValues(gameSnapShot[i].boardStatus);
    setPlayer(gameSnapShot[i].player);
    if (gameSnapShot[i].player === "پروفسور محمد") {
      setTypeX(true);
    } else {
      setTypeX(false);
    }
    const newGameSnapShot = [];
    for (let j = 0; j < Number(gameSnapShot.length); j++) {
      if (j <= i) {
        newGameSnapShot.push(gameSnapShot[j]);
      }
    }
    setCount(i + 1);
  }

  function chooseWinner() {
    let WinningPhases = Array(8).fill("");
    
    boardValuesCopy.forEach((element, i) => {
      if (element) {
        if (i % 3 === 0) {
          //phase #1
          WinningPhases[0] += element;
        }
        if (i % 3 === 1) {
          //phase #2
          WinningPhases[1] += element;
        }
        if (i % 3 === 2) {
          //phase #3
          WinningPhases[2] += element;
        }
        if (i === 0 || i === 1 || i === 2) {
          //phase #4
          WinningPhases[3] += element;
        }
        if (i === 3 || i === 4 || i === 5) {
          //phase #5
          WinningPhases[4] += element;
        }
        if (i === 6 || i === 7 || i === 8) {
          //phase #6
          WinningPhases[5] += element;
        }
        if (i === 0 || i === 4 || i === 8) {
          //phase #7
          WinningPhases[6] += element;
        }
        if (i === 2 || i === 4 || i === 6) {
          //phase #8
          WinningPhases[7] += element;
        }
      }
    });

    WinningPhases.forEach((phase) => {
      if (phase === "XXX") {
        setWinner("پروفسور محمد");
        setBoardValuesCopy(Array(9).fill(null))
       
      }
      if (phase === "OOO") {
        setWinner("  داش کیوان");
        setBoardValuesCopy(Array(9).fill(null))
       

      }
    });

  }
  chooseWinner();
  return (
    <>
      {winner ? <h1>برنده :{winner}</h1> : null}

      <h2>نوبت:{player}</h2>
      <div className="board-row">
        <Square boardValues={boardValues[0]} clickHandler={() => clickHandler(0)} />
        <Square boardValues={boardValues[1]} clickHandler={() => clickHandler(1)} />
        <Square boardValues={boardValues[2]} clickHandler={() => clickHandler(2)} />
      </div>
      <div className="board-row">
        <Square boardValues={boardValues[3]} clickHandler={() => clickHandler(3)} />
        <Square boardValues={boardValues[4]} clickHandler={() => clickHandler(4)} />
        <Square boardValues={boardValues[5]} clickHandler={() => clickHandler(5)} />
      </div>
      <div className="board-row">
        <Square boardValues={boardValues[6]} clickHandler={() => clickHandler(6)} />
        <Square boardValues={boardValues[7]} clickHandler={() => clickHandler(7)} />
        <Square boardValues={boardValues[8]} clickHandler={() => clickHandler(8)} />
      </div>
      <br />
      <div className="list">
        <ul>{gameSnapShotList}</ul>
      </div>
    </>
  );
}

function Square({ boardValues, clickHandler }) {
  return (
    <button className="square" onClick={clickHandler}>
      {boardValues}
    </button>
  );
}
