import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, GridList, GridListTile, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { fetchRecipeFromId, RecipeListType } from "../lib/recipe";
import Footer from "./Footer";

import Header from "./Header";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    //height: 48,
  },
});

interface Props {
  id: string;
}
export function RecipeDetails(props: Props) {
  const classes = useStyles();
  const [recipeList, setRecipeList] = React.useState<RecipeListType | null>(null);

  //初期化
  const init = async () => {
    const recipes = await fetchRecipeFromId(props.id);
    setRecipeList(recipes);
  };
  React.useEffect(() => {
    init();
  }, []);

  function RecipeMain() {
    //nullチェックする
    if (recipeList == null) return <h2>ページが見つかりませんでした</h2>;
    if (recipeList.recipes == null) return <h2>ページが見つかりませんでした</h2>;
    const recipe = recipeList.recipes[0];
    if (recipe.image_url == null) recipe.image_url = "";
    console.log(recipe);

    return (
      <div>
        <Container maxWidth="sm">
          <Box borderColor="primary.main" justifyContent="center" m={2}>
            <Card>
              <CardMedia image={recipe.image_url} component="img" />
              <CardContent>
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {recipe.description}
                  </Typography>
                  <Box p={1}></Box>
                  <Box display="block">
                    <Typography variant="body2" color="textSecondary" component="p">
                      投稿者　　　：{recipe.author.user_name}
                    </Typography>
                  </Box>
                  <Box display="block">
                    <Typography variant="body2" color="textSecondary" component="p">
                      レシピID　　：{recipe.id}
                    </Typography>
                  </Box>
                  <Box display="block">
                    <Typography variant="body2" color="textSecondary" component="p">
                      レシピ登録日：{recipe.published_at}
                    </Typography>
                  </Box>
                  <Box p={2}>
                    <Divider />
                  </Box>
                  <Box className={classes.root} textAlign="center">
                    <Typography variant="h6" component="p">
                      材料
                    </Typography>
                  </Box>
                  <Box m={2}>
                    {recipe.ingredients.map((ingredient, id) => (
                      <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                          <Typography variant="body1" component="p">
                            {ingredient.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" component="p">
                            {ingredient.quantity}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>

                  <Box className={classes.root} textAlign="center">
                    <Typography variant="h6" component="p">
                      手順
                    </Typography>
                  </Box>

                  <Box m={2}>
                    {recipe.steps.map((step, id) => (
                      <div>
                        <Box mt={1} color="primary.main" fontWeight="fontWeightBold" fontSize={16}>
                          STEP {id}
                        </Box>
                        <Typography variant="body2" component="p">
                          {step}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                </Box>
              </CardContent>
              {/* <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button> */}
            </Card>
          </Box>
        </Container>
      </div>
    );
  }

  //レシピがある場合のみ表示する
  function DisplayWithLoading() {
    if (recipeList == null) return <h2></h2>;
    return (
      <div>
        <Header />
        <RecipeMain />
        <Footer />
      </div>
    );
  }
  return <DisplayWithLoading />;
}
