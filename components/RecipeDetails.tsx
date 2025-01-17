import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, GridList, GridListTile, Link, makeStyles, Typography } from "@material-ui/core";
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

  function recipeDate(dateIso: string) {
    const ts = Date.parse(dateIso);
    const dt = new Date(ts);
    return dt.toLocaleDateString();
  }

  function Dammy() {}

  function RecipeMain() {
    //nullチェックする
    if (recipeList == null) return <h2>ページが見つかりませんでした</h2>;
    if (recipeList.recipes == null) return <h2>ページが見つかりませんでした</h2>;
    const recipe = recipeList.recipes[0];
    if (recipe.image_url == null) recipe.image_url = "";
    //console.log(recipe);

    return (
      <div>
        <Container maxWidth="sm">
          <Box borderColor="primary.main" justifyContent="center" m={2}>
            <Card>
              <CardMedia image={recipe.image_url} component="img" />
              <CardContent>
                <Box>
                  <Box textAlign="center" fontWeight={530} fontSize="h5.fontSize">
                    {recipe.title}
                  </Box>
                  <Box mr={2} ml={2} mt={1}>
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
                        レシピ登録日：{recipeDate(recipe.published_at)}
                      </Typography>
                    </Box>
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
                      <Grid container direction="row" justify="space-between" alignItems="center" key={id}>
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
                          STEP {id + 1}
                        </Box>
                        <Typography variant="body2" component="p">
                          {step}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box m={2} justifyContent="center" textAlign="center">
              <Link href="/">
                <Button variant="contained" color="primary">
                  <Box component="span" display="block" width={270}>
                    一覧に戻る
                  </Box>
                </Button>
              </Link>
            </Box>
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
        <Header isTop={false} onClick={Dammy} keyword="" />
        <RecipeMain />
        <Footer />
      </div>
    );
  }
  return <DisplayWithLoading />;
}
