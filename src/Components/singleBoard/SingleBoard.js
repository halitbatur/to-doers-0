import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BoardItems from "../../Containers/boardItems/BoardItems";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import { Card } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    minHeight: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SingleBoard(props) {
  const classes = useStyles();
  const [boardName, setBoardName] = useState(props.data.name);
  const db = useSelector((state) => state.value);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [isOnEditMode, setEditMode] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const itemsRef = db.collection("boardstest").doc(id).collection("boardItems");

  // Adds new item to our board
  const addItem = async (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      dueDate: "",
      assignedTo: [],
      completed: false,
    };
    setItemName("");
    await itemsRef.add(newItem);
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
            // if (!change.doc.data().completed) {
            setBoardItems((boardItems) => [...boardItems, change.doc]);
            // }
            // else {
            //   setBoardItems((boardItems) => {
            //     const newItems = boardItems.filter(
            //       (boardItem) => boardItem.id !== change.doc.id
            //     );
            //     return [...newItems];
            //   });
            // }
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

  const handleChange = (e) => {
    setSortBy(e.target.value);
    sortDemItems(e.target.value);
  };

  // This function will sort the items withing the board
  const sortDemItems = (sortBy) => {
    console.log("Hello");
    console.log(sortBy);
    console.log(boardItems[0].data());
    switch (sortBy) {
      case "DDD":
        setBoardItems(() => {
          const sortedArr = boardItems.sort((a, b) => {
            if (b.data().dueDate.split("-").join("") > a.data().dueDate.split("-").join("")) {
              return 1;
            }
            if (a.data().dueDate.split("-").join("") > b.data().dueDate.split("-").join("")) {
              return -1;
            }
            return 0;
          });
          return [...sortedArr];

        });
        break;
      case "DDA":
        setBoardItems(() =>{
            const sortedArr = boardItems.sort((a, b) => {
              if (b.data().dueDate.split("-").join("") > a.data().dueDate.split("-").join("")) {
                return -1;
              }
              if (a.data().dueDate.split("-").join("") > b.data().dueDate.split("-").join("")) {
                return 1;
              }
              return 0;
            });
          return [...sortedArr];

          });
        break;
      case "TA":
        setBoardItems((boardItems) => {
          const sortedArr = boardItems.sort((a, b) => {
            if (a.data().name > b.data().name) {
              return -1;
            }
            if (b.data().name > a.data().name) {
              return 1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        boardItems.forEach((board) => console.log(board.data()));
        break;

      case "TD":
        setBoardItems((boardItems) => {
          const sortedArr = boardItems.sort((a, b) => {
            if (a.data().name > b.data().name) {
              return 1;
            }
            if (b.data().name > a.data().name) {
              return -1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        break;

      default:
    }
  };

  useEffect(() => {
    liveUpdate();
  }, []);

  const changeBoardName = async (e) => {
    e.preventDefault();
    e.persist();
    await db.collection("boardstest").doc(id).update({
      name: e.target[0].value,
    });
    setBoardName(e.target[0].value);
    setEditMode(false);
  };

  return (
    <Card className="single-board" data-id={id}>
      <Button onClick={() => props.deleteBoard(props.boardId)}>
        <DeleteIcon />
      </Button>
      {isOnEditMode ? (
        <form onSubmit={(e) => changeBoardName(e)}>
          <input type="text" defaultValue={boardName} />
          <Button type="submit">SAVE</Button>
        </form>
      ) : (
        <h2 style={{ display: "inline" }}>{boardName}</h2>
      )}
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="sortby-label">
          Sort By
        </InputLabel>
        <Select
          labelId="sortby-label"
          id="demo-simple-select-outlined"
          value={sortBy}
          onChange={(e) => handleChange(e)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="DDA">DueDate Ascending</MenuItem>
          <MenuItem value="DDD">DueDate Descending</MenuItem>
          <MenuItem value="TA">Title Ascending</MenuItem>
          <MenuItem value="TD">Title Descending</MenuItem>
        </Select>
      </FormControl>
      {!isOnEditMode && (
        <Button onClick={() => setEditMode(true)}>
          <EditIcon />
        </Button>
      )}
      <BoardItems boardItems={boardItems} id={id} />
      <form onSubmit={(e) => addItem(e)}>
        <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <Button type="submit">
          <AddIcon />
          Add item
        </Button>
      </form>
    </Card>
  );
}
