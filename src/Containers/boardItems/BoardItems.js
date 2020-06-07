import React from "react";

import BoardItem from "../../Components/boardItem/BoardItem";

export default function BoardItems(props) {
  const render = () => {
    return props.boardItems.map((boardItem, index) => {
      return (
        <BoardItem
          data={boardItem.data()}
          boardId={props.id}
          itemId={boardItem.id}
          key={index}
        />
      );
    });
  };

  return <div>{render()}</div>;
}
