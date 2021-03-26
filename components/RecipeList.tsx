import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import ScrollToTop from "./ScrollToTop";

//component
import { RecipeCard } from "./Recipe";
import RecipePagination from "./RecipePagination";
import Footer from "./Footer";

//library
import { fetchRecipeFromURL, fetchRecipeList, RecipeListType, RecipeType } from "../lib/recipe";

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
  }, []);

  var smoothScroll = function (range: number) {
    var position = 0; // スクロールする位置
    var progress = 0; // 現在の進捗 0 ～ 100
    var easeOut = function (p: number) {
      // ease-out に当てはめた値を返す
      return p * (2 - p);
    };
    var move = function () {
      // 実際にスクロールを行う
      progress++; // 進捗を進める
      position = range * easeOut(progress / 100); // スクロールする位置を計算する

      window.scrollTo(0, position); // スクロールさせる

      if (position < range) {
        // 現在位置が目的位置より進んでいなければアニメーションを続行させる
        requestAnimationFrame(move);
      }
    };

    requestAnimationFrame(move); // 初回呼び出し
  };

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

  interface Props {
    recipeList: RecipeListType;
  }
  function Display(props: Props) {
    //エラーチェック
    if (props.recipeList == null) return <div></div>;
    const recipeList = props.recipeList;
    if (recipeList.recipes == null) return <div></div>;
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
        <Display recipeList={recipeList} />
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
