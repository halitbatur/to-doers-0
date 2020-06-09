import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddBtn from "../../Components/addBtn/AddBtn";
import SingleBoard from "../../Components/singleBoard/SingleBoard";

import { Button } from "@material-ui/core";

export default function BoardContainer(props) {
  const db = useSelector((state) => state.value);

  const [boards, setBoards] = useState([]);

  // Live updates the boards
  const liveUpdate = async () => {
    await db.collection("boardstest").onSnapshot((ss) => {
      const changes = ss.docChanges();
      changes.forEach((change) => {
        console.log(change.doc.id);
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc]);
        }
      });
    });
  };

  const deleteBoard = async (id) => {
    await db
      .collection("boardstest")
      .doc(id)
      .delete()
      .then(() => console.log("delete board with the id:" + id));

    setBoards(() => boards.filter((board) => board.id !== id));
  };

  const renderDemBoards = () => {
    return boards.map((board, index) => {
      return (
        <SingleBoard
          data={board.data()}
          boardId={board.id}
          key={board.id}
          deleteBoard={() => deleteBoard(board.id)}
        ></SingleBoard>
      );
    });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  return (
    <div
      style={{
        gridColumn: "2/7",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
      }}
    >
      <div
        style={{
          gridColumn: "1/3",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
        }}
      >
        {renderDemBoards()}
      </div>
      <AddBtn />
    </div>
  );
}
