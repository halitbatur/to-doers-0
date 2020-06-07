import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddBtn from "../../Components/addBtn/AddBtn";
import SingleBoard from "../../Components/singleBoard/SingleBoard";

import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function BoardContainer(props) {
  const db = useSelector((state) => state.value);
  const dbFunctions = useSelector((state) => state.functions);

  const [boards, setBoards] = useState([]);

  // Live updates the boards
  const liveUpdate = async () => {
    await db.collection("boardstest").onSnapshot((ss) => {
      const changes = ss.docChanges();
      changes.forEach((change) => {
        console.log(change.doc.id);
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc]);
        } else if (change.type === "removed") {
          setBoards((boards) => {
            const newBoards = boards.filter(
              (board) => board.id !== change.doc.id
            );
            newBoards.forEach((board) => {
              console.log(board.id);
            });
            return [...newBoards];
          });
        }
      });
    });
  };

  const deleteBoard = async (id) => {
    const path = db.collection("boardstest").doc(id);
    deleteAtPath(path);
    await db
      .collection("boardstest")
      .doc(id)
      .delete()
      .then(() => console.log("delete board with the id:" + id));
  };

  const deleteAtPath = (path) => {
    const deleteFn = dbFunctions.httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result) {
        console.log("Delete success: " + JSON.stringify(result));
      })
      .catch(function (err) {
        console.log("Delete failed, see console,");
        console.warn(err);
      });
  };

  const renderDemBoards = () => {
    return boards.map((board, index) => {
      return (
        <SingleBoard data={board.data()} boardId={board.id} key={index}>
          {" "}
          <Button onClick={() => deleteBoard(board.id)}>
            <DeleteIcon />
          </Button>
          <p>name: {board.data().name}</p>
        </SingleBoard>
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
