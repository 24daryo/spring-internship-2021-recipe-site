import recipes from "../data/recipes.json";

const url = "https://internship-recipe-api.ckpd.co/recipes";
const key = process.env.NEXT_PUBLIC_API_KEY;

//const key = process.env.API_KEY;
export type RecipeType = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  author: {
    user_name: string;
  };
  published_at: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
  related_recipes: number[];
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
export async function fetchRecipeFromId(id: string): Promise<RecipeListType> {
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

export async function fetchRecipeFromKeyword(keyword: string): Promise<RecipeListType> {
  const headers = {
    "X-Api-Key": key ? key : "",
  };
  //id = 6686030;
  const response = await fetch(`https://internship-recipe-api.ckpd.co/search?keyword=${keyword}`, {
    method: "GET",
    headers: headers,
  });
  const recipes: RecipeListType = await response.json();
  return recipes;
}

export async function fetchRecipeList(pageId: number): Promise<RecipeListType> {
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

export async function fetchRecipeFromURL(input_url: string): Promise<RecipeListType> {
  const headers = {
    "X-Api-Key": key ? key : "",
  };
  const response = await fetch(`${input_url}`, {
    method: "GET",
    headers: headers,
  });
  const recipes: RecipeListType = await response.json();
  console.log(recipes);
  return recipes;
}
