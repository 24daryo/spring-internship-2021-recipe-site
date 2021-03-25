import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
  })
);

interface Props {
  links: {
    next?: string;
    prev?: string;
  };
  clickPrev: () => void;
  clickNext: () => void;
}
export default function RecipePagination(props: Props) {
  const classes = useStyles();
  // const [page, setPage] = React.useState(1);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  console.log(props);

  function NextButton(url?: string, text?: string, onClick?: () => void) {
    if (url != null) {
      return (
        <Button variant="contained" color="primary" onClick={onClick}>
          <Box component="span" display="block" width={270}>
            {text}
          </Box>
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="primary" disabled>
          <Box component="span" display="block" width={270}>
            {text}
          </Box>
        </Button>
      );
    }
  }
  return (
    <Box className={classes.root}>
      {/* <Typography>Page: {page}</Typography> */}
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item sm={6}>
          <Box>{NextButton(props.links.prev, "PREV", props.clickPrev)}</Box>
        </Grid>
        <Grid item sm={6}>
          <Box>{NextButton(props.links.next, "NEXT", props.clickNext)}</Box>
        </Grid>
      </Grid>
      <Box display="inline-block" textAlign="center">
        {/* <Pagination count={10} color="primary" shape="rounded" siblingCount={0} onChange={handleChange} /> */}
      </Box>
    </Box>
  );
}
