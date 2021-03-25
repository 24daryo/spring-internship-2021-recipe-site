import { AppBar, Box, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function Footer() {
  return (
    <Box textAlign="center" justifyContent="center">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={8}>
              <Typography variant="body1" color="inherit">
                © 2021 Sample All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
