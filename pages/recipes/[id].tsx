import { useRouter } from "next/router";

import { RecipeDetails } from "../../components/RecipeDetails";

function RecipePage() {
  const router = useRouter();
  const id = router.query.id;
  if (id != null && typeof id == "string") {
    return (
      <div style={{ backgroundColor: "#f7efee" }}>
        <RecipeDetails id={id} />
      </div>
    );
    //return <div> Hello</div>;
  }
  return <div></div>;
}

export default RecipePage;
