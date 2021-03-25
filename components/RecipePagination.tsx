import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { Box, Container, Grid } from "@material-ui/core";

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

export default function RecipePagination() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Box className={classes.root}>
      {/* <Typography>Page: {page}</Typography> */}
      <Box display="inline-block" textAlign="center">
        <Pagination count={10} color="primary" shape="rounded" siblingCount={0} onChange={handleChange} />
      </Box>
    </Box>
  );
}
