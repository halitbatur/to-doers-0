import React from "react";
import SingleBoard from "../Components/SingleBoard";

export default function Boards(props) {
  const renderDemBoards = () => {
    return props.boards.map((board) => {
      return <SingleBoard data={board} db={props.db} />;
    });
  };

  return <div>{renderDemBoards()}</div>;
}
