import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  ListItem,
  Divider,
  CssBaseline,
  Drawer,
  ListItemIcon,
  List,
  ListItemText,
} from "@material-ui/core";

import {
  MoveToInbox as InboxIcon,
  Home as HomeIcon,
  AccessAlarm as AccessAlarmIcon,
  DoneOutlineOutlined as DoneIcon,
  InfoOutlined as InfoIcon,
} from "@material-ui/icons";

import { NavLink } from "react-router-dom";

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
    <Grid className={classes.root} lg={1}>
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
          {["Home", "Pomodoro", "Completed"].map((text, index) => (
            <NavLink
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
            </NavLink>
          ))}
        </List>

        <Divider />
        <List>
          {["About", "Contact Us"].map((text, index) => (
            <NavLink
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
            </NavLink>
          ))}
        </List>
      </Drawer>
    </Grid>
  );
}
