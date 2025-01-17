import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import ScrollToTop from "./ScrollToTop";

//component
import { RecipeCard } from "./Recipe";
import RecipePagination from "./RecipePagination";
import Footer from "./Footer";
import Header from "./Header";
//library
import { fetchRecipeFromURL, fetchRecipeList, RecipeListType, fetchRecipeFromKeyword } from "../lib/recipe";

export default function ImageGridList() {
  //レシピはある保証なし
  const [recipeList, setRecipeList] = React.useState<RecipeListType | null>(null);

  //初期化
  const init = async () => {
    const recipes = await fetchRecipeList(1);
    setRecipeList(recipes);
  };

  //初期化の実行箇所
  React.useEffect(() => {
    init();
    console.log("更新更新");
  }, []);

  const clickNext = async () => {
    if (recipeList != null) {
      const links = recipeList.links;
      if (links.next != null) {
        //次のページに遷移
        console.log("次のページに遷移します");
        const recipes = await fetchRecipeFromURL(links.next);
        setRecipeList(recipes);

        window.scrollTo(0, 0);
        //smoothScroll(0);
      }
    }
  };

  const clickPrev = async () => {
    if (recipeList != null) {
      const links = recipeList.links;
      if (links.prev != null) {
        //次のページに遷移
        console.log("前のページに遷移します");
        const recipes = await fetchRecipeFromURL(links.prev);
        setRecipeList(recipes);

        window.scrollTo(0, 0);
      }
    }
  };

  const [keywordValue, setValue] = React.useState("");

  const Serch = async (text: string) => {
    console.log("上から表示成功");
    console.log(text);
    setValue(text);
    //ここで情報を変更する
    if (text !== "") {
      const recipes = await fetchRecipeFromKeyword(text);
      setRecipeList(recipes);
    }
  };

  function getHeight() {
    const top = window.innerHeight;
    return top;
  }

  interface Props {
    recipeList: RecipeListType;
  }
  function Display(props: Props) {
    //エラーチェック
    if (props.recipeList == null) return <div></div>;
    const recipeList = props.recipeList;
    if (recipeList.recipes == null)
      return (
        <div>
          <Box mt={5} mb={10} fontFamily="Comic Sans MS" color="#333333">
            レシピが見つかりませんでした
          </Box>
          <img src="https://s3-ap-northeast-1.amazonaws.com/hoiku-fine-s3-production/contents/wp-content/uploads/2017/12/23163750/a1f2790d23318964457a93e1e3bfa2c8.png" width="300"></img>
          <Box height={getHeight()}></Box>
        </div>
      );
    const recipes = recipeList.recipes;
    if (recipeList.links == null) return <div></div>;
    const links = recipeList.links;
    if (recipes == []) return <div></div>;

    return (
      <Container maxWidth="md">
        <Box borderColor="primary.main" justifyContent="center">
          <Grid container direction="row" justify="center">
            {recipes.map((recipe) => (
              <Grid item sm={6} key={recipe.id}>
                <Box m={1} borderColor="primary.main">
                  <RecipeCard recipe={recipe} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <RecipePagination links={links} clickNext={clickNext} clickPrev={clickPrev} />
      </Container>
    );
  }

  function DisplayWithLoading() {
    if (recipeList == null) return <h2></h2>;
    return (
      <div>
        <Box textAlign="center" justifyContent="center" fontFamily="Comic Sans MS" color="#333333">
          <Header isTop={true} onClick={Serch} keyword={keywordValue} />
          <h1>♪Happy Recipe♪</h1>
          <Display recipeList={recipeList} />
          <Footer />
        </Box>
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
