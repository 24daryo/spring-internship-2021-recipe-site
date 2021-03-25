import Link from "next/link";
import { getRecipes } from "../lib/recipe";
import React from "react";

import type { NextPage } from "next";
import type { Recipe } from "../lib/recipe";

// components
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";

//library functions
//import { fetchRecipe } from "../lib/recipe";

//material-ui
import Box from "@material-ui/core/Box";
import { createMuiTheme } from "@material-ui/core/styles";
const my_theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4791db",
      main: "#2196f3",
      dark: "#115293",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
type Props = {
  recipes: Recipe[];
};

const Home: NextPage<Props> = (props) => {
  //const { recipes } = props;
  //ページ番号だけを管理する
  //const [page, setPage] = useState<number>(1);
  // const init = async () => {
  //   const response = await fetchRecipe(1);
  //   console.log(response);
  // };

  //[]なのではじめの一回だけ呼ばれる
  // React.useEffect(() => {
  //   init();
  // }, []);

  return (
    <div style={{ backgroundColor: "#f7efee" }}>
      <Header />
      <Box textAlign="center" justifyContent="center">
        <h1>Recipe Like Google</h1>
        <RecipeList />
      </Box>
    </div>
  );
};

export default Home;
