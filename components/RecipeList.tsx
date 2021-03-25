import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";

//component
import { RecipeCard } from "./Recipe";
import RecipePagination from "./RecipePagination";
import Footer from "./Footer";

//library
import { fetchRecipeList, RecipeListType, RecipeType } from "../lib/recipe";

export default function ImageGridList() {
  //レシピはある保証なし
  const [recipeList, setRecipeList] = React.useState<RecipeListType | null>(null);

  //初期化
  const init = async () => {
    const recipes = await fetchRecipeList(2);
    setRecipeList(recipes);
  };

  //初期化の実行箇所
  React.useEffect(() => {
    init();
  }, []);

  interface Props {
    recipes: RecipeType[];
  }
  function Display(props: Props) {
    return (
      <Box>
        <Container maxWidth="md">
          <Box borderColor="primary.main" justifyContent="center">
            <Grid container direction="row" justify="center">
              {props.recipes.map((recipe) => (
                <Grid item sm={6} key={recipe.id}>
                  <Box m={1} borderColor="primary.main">
                    <RecipeCard recipe={recipe} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }

  function DisplayWithLoading() {
    if (recipeList == null) return <h2>Loading</h2>;
    return (
      <div>
        <Display recipes={recipeList.recipes} />
        <RecipePagination />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <DisplayWithLoading />
    </div>
  );
}

//ポイント
//Gridの下はすぐにGridにしないと不具合が発生するので注意
//Gridで複製するものはユニークにしないと警告が出る
//<Grid item md={6} key={recipe}>
