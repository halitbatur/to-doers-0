import React from "react";
import { Button } from "@material-ui/core";
import deleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";

export default function BoardItem(props) {
  const db = useSelector((state) => state.value);
  const data = props.data;

  const deleteItem = () => {
    db.collection("boardstest")
      .doc(props.boardId)
      .collection("boardItems")
      .doc(`${props.itemId}`)
      .delete();
  };

  return (
    <div>
      <h2>{data.name}</h2>

      {data.completed ? "Completed!" : "Still not completed :( work hard!"}
      <Button onClick={deleteItem}>Delete Item</Button>
    </div>
  );
}
