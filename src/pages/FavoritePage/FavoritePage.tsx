import { Page, RecipeCardSkeleton } from "@components";
import RecipeCard, { RecipeCardProps } from "@components/RecipeCard/RecipeCard";
import { Grid } from "@mui/material";
import RecipesService from "@service/recipes";
import { useEffect, useState } from "react";
import { container } from "tsyringe";

const FavoritePage = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>();
  useEffect(() => {
    const recipesContainer = container.resolve(RecipesService);
    recipesContainer.getLikedRecipes().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);
  return (
    <Page title="Favorite">
      {recipes?.length ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {recipes.map((repice) => {
            return (
              <Grid item xs={12} sm={4} md={4} key={repice.id}>
                <RecipeCard {...repice} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={4} md={4}>
            <RecipeCardSkeleton />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <RecipeCardSkeleton />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <RecipeCardSkeleton />
          </Grid>
        </Grid>
      )}
      ;
    </Page>
  );
};

export default FavoritePage;
