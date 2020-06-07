import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";

export default function AddBtn() {
  const [boardName, setBoardName] = useState("");
  const db = useSelector((state) => state.value);

  // Adding a new board
  const addBoard = async () => {
    await db.collection("boardstest").add({
      name: boardName,
    });
  };

  return (
    <div style={{ gridColumn: "3/4" }}>
      <form>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        ></input>
        <Button onClick={() => addBoard()}>
          <AddIcon />
        </Button>
      </form>
    </div>
  );
}
