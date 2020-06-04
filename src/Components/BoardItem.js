import React from "react";

export default function BoardItem(props) {
  const data = props.data;
  return (
    <div>
      {data.data().completed
        ? "Completed!"
        : "Still not completed :( work hard!"}
    </div>
  );
}
