import React, { useState, useEffect } from "react";
import Boards from "./Boards";

export default function BoardContainer(props) {
  const db = props.db;
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [boards, setBoards] = useState([]);

  // Adding a new board
  const addBoardInfo = async (e) => {
    e.preventDefault();
    e.persist();
    await db.collection("boardstest").add({
      name,
      color,
      dataItems: {},
    });
    e.target.reset();
  };

  const liveUpdate = async () => {
    await db.collection("boardstest").onSnapshot((ss) => {
      const changes = ss.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc]);
        } else if (change.type === "modified") {
          console.log(change.doc.id);
          setBoards((boards) => {
            const newBoards = boards.filter(
              (board) => board.id !== change.doc.id
            );
            return [...newBoards, change.doc];
          });
          // setBoards((boards) => boards.filter(board => board.newIndex !== change.))
        }
      });
    });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => addBoardInfo(e)}>
        board name
        <input
          type="text"
          name="board-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        board color
        <input
          type="text"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <Boards boards={boards} db={db} />
    </div>
  );
}
