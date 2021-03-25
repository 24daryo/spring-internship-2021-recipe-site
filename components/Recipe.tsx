import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { RecipeType } from "../lib/recipe";
import { Box } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    // maxHeight: 350,
  },
  media: {
    height: 270,
  },
});

interface Props {
  recipe: RecipeType;
}
export function RecipeCard(props: Props) {
  const classes = useStyles();
  console.log(props.recipe);
  const recipe = props.recipe;

  return (
    <Card>
      <CardActionArea className={classes.root}>
        <CardMedia className={classes.media} image={recipe.image_url} title="Contemplative Reptile" />
        <CardContent>
          <Box height={150}>
            <Typography gutterBottom variant="h5" component="h2">
              {recipe.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe.description}
            </Typography>
          </Box>
        </CardContent>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActionArea>
    </Card>
  );
}
