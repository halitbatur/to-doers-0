import React from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";

export default function AddBtn() {
  const db = useSelector((state) => state.value);

  // Adding a new board
  const addBoard = async () => {
    console.log("Hello");
    await db.collection("boardstest").add({
      name: "Hello",
    });
  };

  return (
    <div>
      <AddIcon onClick={() => addBoard()}></AddIcon>
    </div>
  );
}
