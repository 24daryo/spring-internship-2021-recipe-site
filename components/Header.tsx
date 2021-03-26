import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, fade, Theme, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import Link from "next/link";
import { Box, Button, CardActionArea, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      // display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "block",
      // },
      display: "block",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
interface Props {
  isTop: boolean;
  keyword: string;
  onClick: (text: string) => void;
}
export default function SearchAppBar(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  //初期化
  const init = async () => {
    setValue(props.keyword);
  };

  //初期化の実行箇所
  React.useEffect(() => {
    init();
    console.log("ヘッダー更新");
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const clickbutton = () => {
    console.log("クリックしました");
    props.onClick(value);
  };

  function reset() {
    window.location.reload();
  }
  function clickPrev() {
    if (props.isTop == true) {
      return (
        <CardActionArea>
          <Box textAlign="left">
            <Typography className={classes.title} variant="h6" noWrap>
              <a onClick={reset}>Recipesite Sample</a>
            </Typography>
          </Box>
        </CardActionArea>
      );
    } else {
      return (
        <Link href="/">
          <CardActionArea>
            <Box textAlign="left">
              <Typography className={classes.title} variant="h6" noWrap>
                Recipesite Sample
              </Typography>
            </Box>
          </CardActionArea>
        </Link>
      );
    }
  }

  function clickSerch() {
    if (props.isTop == true) {
      return (
        <div>
          <Box>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}></div>
                  <InputBase
                    placeholder="レシピを検索"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
          {/* <Button onClick={clickbutton}>
            検索
            <MoreIcon />
          </Button> */}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          {clickPrev()}
          {clickSerch()}
          <Button onClick={clickbutton} color="inherit">
            <Box ml={-2} borderRadius="50%">
              <SearchIcon />
            </Box>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
