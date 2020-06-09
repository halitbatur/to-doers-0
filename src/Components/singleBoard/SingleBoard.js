import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoardItems from "../../Containers/boardItems/BoardItems";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Card } from "@material-ui/core";

export default function SingleBoard(props) {
  const [boardName, setBoardName] = useState(props.data.name);
  const db = useSelector((state) => state.value);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [isOnEditMode, setEditMode] = useState(false);

  const itemsRef = db.collection("boardstest").doc(id).collection("boardItems");

  // Adds new item to our board
  const addItem = async (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      dueDate: "",
      assignedTo: [],
      completed: false,
    };
    setItemName("");
    await itemsRef.add(newItem);
  };

  const liveUpdate = async () => {
    await db
      .collection("boardstest")
      .doc(id)
      .collection("boardItems")
      .onSnapshot((ss) => {
        const changes = ss.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            // if (!change.doc.data().completed) {
            setBoardItems((boardItems) => [...boardItems, change.doc]);
            // }
            // else {
            //   setBoardItems((boardItems) => {
            //     const newItems = boardItems.filter(
            //       (boardItem) => boardItem.id !== change.doc.id
            //     );
            //     return [...newItems];
            //   });
            // }
          } else if (change.type === "removed") {
            setBoardItems((boardItems) => {
              const newItems = boardItems.filter(
                (boardItem) => boardItem.id !== change.doc.id
              );
              return [...newItems];
            });
          }
        });
      });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  const changeBoardName = async (e) => {
    e.preventDefault();
    e.persist();
    console.log(e.target[0].value);
    await db.collection("boardstest").doc(id).update({
      name: e.target[0].value,
    });
    setBoardName(e.target[0].value);
    setEditMode(false);
  };

  return (
    <Card className="single-board" data-id={id}>
      <Button onClick={() => props.deleteBoard(props.boardId)}>
        <DeleteIcon />
      </Button>
      {isOnEditMode ? (
        <form onSubmit={(e) => changeBoardName(e)}>
          <input type="text" defaultValue={boardName} />
          <Button type="submit">SAVE</Button>
        </form>
      ) : (
        <h2 style={{ display: "inline" }}>{boardName}</h2>
      )}
      {!isOnEditMode && (
        <Button onClick={() => setEditMode(true)}>
          <EditIcon />
        </Button>
      )}
      <BoardItems boardItems={boardItems} id={id} />
      <form onSubmit={(e) => addItem(e)}>
        <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <Button type="submit">
          <AddIcon />
          Add item
        </Button>
      </form>
    </Card>
  );
}
