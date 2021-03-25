import { useRouter } from "next/router";

import { RecipeDetails } from "../../components/RecipeDetails";

function RecipePage() {
  const router = useRouter();
  const id = router.query.id;
  if (id != null && typeof id == "string") {
    return <RecipeDetails id={id} />;
    //return <div> Hello</div>;
  }
  return <div></div>;
}

export default RecipePage;
