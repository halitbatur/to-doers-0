import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddBtn from "../../Components/addBtn/AddBtn";
import SingleBoard from "../../Components/singleBoard/SingleBoard";
import SingleList from "../../Components/singleList/SingleList";
import { DragDropContext } from "react-beautiful-dnd";

export default function BoardContainer(props) {
  const db = useSelector((state) => state.value);

  const [boards, setBoards] = useState([]);

  // Live updates the boards
  const liveUpdate = async () => {
    await db.collection("boardstest").onSnapshot((ss) => {
      const changes = ss.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc]);
        } else if (change.type === "removed") {
          setBoards((boards) => {
            const newBoards = boards.filter(
              (board) => board.id !== change.doc.id
            );

            return [...newBoards];
          });
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
    return boards.map((board) => {
      return (
        <SingleBoard
          data={board.data()}
          boardId={board.id}
          key={board.id}
          deleteBoard={deleteBoard}
        ></SingleBoard>
      );
    });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  const onDragEnd = () => {
    // update the order
  };

  return (
    <div
      style={{
        gridColumn: "2/7",
        display: "grid",
        width: "100%",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "grid",
          }}
        >
          {renderDemBoards()}
        </div>
      </DragDropContext>

      <AddBtn />
    </div>
  );
}
