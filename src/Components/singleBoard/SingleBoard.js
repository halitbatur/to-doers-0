import React, { useState } from "react";
import { useSelector } from "react-redux";
import BoardItems from "../../Containers/boardItems/BoardItems";
import AddIcon from "@material-ui/icons/Add";

export default function SingleBoard(props) {
  const db = useSelector((state) => state.value);

  const data = props.data;
  const itemsRef = db
    .collection("boardstest")
    .doc(`${data.id}`)
    .collection("boardItems");

  // Adds new item to our board
  const addItem = () => {
    itemsRef.add({
      name: "item2",
      dueDate: "03/06/2020",
      assginedTo: ["gunsu"],
      completed: false,
    });
  };

  return (
    <div className="single-board" data-id={data.id}>
      <p>name: {data.data().name}</p>
      <BoardItems id={data.id} />
      <button onClick={addItem}>
        <AddIcon />
        Add item
      </button>
    </div>
  );
}
