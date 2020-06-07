import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoardItems from "../../Containers/boardItems/BoardItems";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";

export default function SingleBoard(props) {
  const data = props.data;
  console.log(data);
  const db = useSelector((state) => state.value);
  const firebase = useSelector((state) => state.fire);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);

  const itemsRef = db.collection("boardstest").doc(id);

  // Adds new item to our board
  const addItem = async () => {
    await itemsRef.update({
      items: firebase.firestore.FieldValue.arrayUnion({
        name: "item",
        dueDate: "03/06/2020",
        assginedTo: ["gunsu"],
        completed: false,
      }),
    });
  };

  const liveUpdate = async () => {
    await db
      .collection("boardstest")
      .doc(id)
      .collection("boardItems")
      .onSnapshot((ss) => {
        const changes = ss.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            setBoardItems((boardItems) => [...boardItems, change.doc]);
          } else if (change.type === "removed") {
            setBoardItems((boardItems) => {
              const newItems = boardItems.filter(
                (boardItem) => boardItem.id !== change.doc.id
              );
              return [...newItems];
            });
          }
        });
      });
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  return (
    <Card className="single-board" data-id={id}>
      {props.children}
      <BoardItems boardItems={data.items} id={id} />
      <Button onClick={addItem}>
        <AddIcon />
        Add item
      </Button>
    </Card>
  );
}
