import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DoneIcon from "@material-ui/icons/DoneOutlineOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Home", "Pomodora", "Completed"].map((text, index) => (
            <Link
              to={() => {
                switch (index) {
                  case 0:
                    return "/";
                  case 1:
                    return "/pomodoro";
                  case 2:
                    return "/completed";
                  default:
                    return "/";
                }
              }}
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <AccessAlarmIcon />}
                  {index === 2 && <DoneIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />
        <List>
          {["About", "Contact Us"].map((text, index) => (
            <Link
              to={() => {
                switch (index) {
                  case 0:
                    return "/about";
                  case 1:
                    return "/contactus";
                  default:
                    return "/";
                }
              }}
            >
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InfoIcon /> : <InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
