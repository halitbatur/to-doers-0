import React from "react";

export default function SingleBoard(props) {
  const data = props.data;
  const batch = props.db.batch();
  const itemsRef = props.db
    .collection("boardstest")
    .doc(`${data.id}`)
    .collection("boardItems");

  // adds new item to our board
  const addItem = () => {
    itemsRef.add({
      name: "item1",
      dueDate: "tommorow",
      assginedTo: ["halit", "gunsu"],
      completed: false,
    });
  };

  //   batch.set(itemsRef, { name: "not that easy ?" });

  // batch.commit();

  return (
    <div className="single-board" data-id={data.id}>
      <p>name: {data.data().name}</p>
      <p>color: {data.data().color}</p>
      <button onClick={addItem}>Add a new item</button>
    </div>
  );
}
