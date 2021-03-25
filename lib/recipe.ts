import recipes from "../data/recipes.json";

const url = "https://internship-recipe-api.ckpd.co/recipes";

export type RecipeType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
};

export type RecipeListType = {
  // レシピ一覧
  recipes: RecipeType[];

  // ページネーション可能な場合の次、前のページのリンク
  links: {
    next?: string;
    prev?: string;
  };
};

//API機能群
export async function fetchRecipe(id: number): Promise<RecipeListType> {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const headers = {
    "X-Api-Key": key ? key : "",
  };
  //id = 6686030;
  const response = await fetch(`${url}?id=${id}`, {
    method: "GET",
    headers: headers,
  });
  const recipes: RecipeListType = await response.json();
  return recipes;
}

export async function fetchRecipeList(pageId: number): Promise<RecipeListType> {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const headers = {
    "X-Api-Key": key ? key : "",
  };
  const response = await fetch(`${url}?page=${pageId}`, {
    method: "GET",
    headers: headers,
  });
  const recipes: RecipeListType = await response.json();
  console.log(recipes);
  return recipes;
}
