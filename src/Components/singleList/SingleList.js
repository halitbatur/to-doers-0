import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BoardItems from "../../Containers/boardItems/BoardItems";
import InputLabel from "@material-ui/core/InputLabel";
import { List, Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
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
  const [boardName] = useState(props.data.name);
  const db = useSelector((state) => state.value);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Adds new item to our board

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
    console.log(boardItems[0].data());
    switch (sortBy) {
      case "DDD":
        setBoardItems(() => {
          const sortedArr = boardItems.sort((a, b) => {
            if (
              b.data().dueDate.split("-").join("") >
              a.data().dueDate.split("-").join("")
            ) {
              return 1;
            }
            if (
              a.data().dueDate.split("-").join("") >
              b.data().dueDate.split("-").join("")
            ) {
              return -1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        break;
      case "DDA":
        setBoardItems(() => {
          const sortedArr = boardItems.sort((a, b) => {
            if (
              b.data().dueDate.split("-").join("") >
              a.data().dueDate.split("-").join("")
            ) {
              return -1;
            }
            if (
              a.data().dueDate.split("-").join("") >
              b.data().dueDate.split("-").join("")
            ) {
              return 1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        break;
      case "TD":
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
        break;

      case "TA":
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

  return (
    <Grid item lg={12}>
      <List className="single-board" data-id={id}>
        <h2 style={{ display: "inline" }}>{boardName}</h2>

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
        <ListItem>
          <BoardItems boardItems={boardItems} id={id} />
        </ListItem>
      </List>
    </Grid>
  );
}
