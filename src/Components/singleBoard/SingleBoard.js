import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoardItems from "../../Containers/boardItems/BoardItems";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

export default function SingleBoard(props) {
  const data = props.data;
  const db = useSelector((state) => state.value);
  const firebase = useSelector((state) => state.fire);
  const [boardItems, setBoardItems] = useState(data.items);
  const [itemName, setItemName] = useState("");

  const itemsRef = db.collection("boardstest").doc(props.boardId);

  // Adds new item to our board
  const addItem = async () => {
    const newItem = {
      name: itemName,
      dueDate: "",
      assginedTo: [],
      completed: false,
      id: uuidv4(),
    };

    await itemsRef.update({
      items: firebase.firestore.FieldValue.arrayUnion(newItem),
    });

    setBoardItems([...boardItems, newItem]);
  };

  const deleteItem = async (item) => {
    await itemsRef.update({
      items: firebase.firestore.FieldValue.arrayRemove(item),
    });
    setBoardItems(() =>
      boardItems.filter((boarditem) => boarditem.id !== item.id)
    );
  };

  const editItem = async () => {
    /*await itemsRef.update(()=>{

    })*/

  };
  const deleteBoard = () => {
    setBoardItems([]);
    props.deleteBoard();
  };

  return (
    <Card className="single-board" data-id={props.id}>
      <Button onClick={() => deleteBoard()}>
        <DeleteIcon />
      </Button>
      <p>name: {data.name}</p>
      <BoardItems
        boardItems={boardItems}
        id={props.id}
        deleteItem={deleteItem}
        editItem={editItem}
      />

      <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
      <Button onClick={addItem}>
        <AddIcon />
        Add item
      </Button>
    </Card>
  );
}
