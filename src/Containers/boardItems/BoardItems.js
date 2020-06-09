import React from "react";

import BoardItem from "../../Components/boardItem/BoardItem";

export default function BoardItems(props) {
  const render = () => {
    return props.boardItems.map((boardItem, index) => {
      return (
        <BoardItem deleteItem={props.deleteItem} data={boardItem} key={index} />
      );
    });
  };

  return <div>{render()}</div>;
}
