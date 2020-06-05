import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Boards from "../../Containers/boards/Boards";
import AddBtn from "../../Components/addBtn/AddBtn";
export default function BoardContainer(props) {
  const db = useSelector((state) => state.value);

  const [boards, setBoards] = useState([]);

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
        }
      });
    });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
      <Boards boards={boards} db={db} />
      <AddBtn />
    </div>
  );
}
