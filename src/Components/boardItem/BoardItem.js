import React from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function BoardItem(props) {
  const data = props.data;
  console.log(data);

  return (
    <div>
      <h2>{data.name}</h2>

      {data.completed ? "Completed!" : "Still not completed :( work hard!"}
      <Button onClick={() => props.deleteItem(data)}>
        <DeleteIcon />
      </Button>
    </div>
  );
}
