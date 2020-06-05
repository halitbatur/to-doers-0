import React from "react";
import SingleBoard from "../../Components/singleBoard/SingleBoard";

export default function Boards(props) {
  const renderDemBoards = () => {
    return props.boards.map((board) => {
      return <SingleBoard data={board} />;
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {renderDemBoards()}
    </div>
  );
}
