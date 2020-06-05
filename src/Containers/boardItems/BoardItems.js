import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoardItem from "../../Components/boardItem/BoardItem";

export default function BoardItems(props) {
  const [boardItems, setBoardItems] = useState([]);
  const db = useSelector((state) => state.value);

  const liveUpdate = async () => {
    await db
      .collection("boardstest")
      .doc(props.id)
      .collection("boardItems")
      .onSnapshot((ss) => {
        const changes = ss.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            setBoardItems((boards) => [...boards, change.doc]);
          } else if (change.type === "modified") {
            console.log(change.doc.id);
            setBoardItems((boards) => {
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

  const render = () => {
    return boardItems.map((boardItem) => {
      return <BoardItem data={boardItem} />;
    });
  };

  return <div>{render()}</div>;
}
