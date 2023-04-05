import { Page, RecipeCardSkeleton } from "@components";
import RecipeCard, { RecipeCardProps } from "@components/RecipeCard/RecipeCard";
import Filter from "@features/Filter";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";

const PopularRecipes: FC<{
  recipes: RecipeCardProps[] | undefined;
}> = (props) => {
  const { recipes } = props;
  return recipes?.length ? (
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
  );
};

const RecommendsRecipes: FC<{
  recipes: RecipeCardProps[] | undefined;
}> = (props) => {
  const { recipes } = props;
  return recipes?.length ? (
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
  );
};

const HomePage = () => {
  return (
    <Page title="Home">
      <Typography
        sx={{
          my: 3,
        }}
        variant="h1"
        component="h2"
      >
        Popular
      </Typography>
      <Filter
        RenderComponent={PopularRecipes}
        query={{
          searchQuery: "",
          tagQuery: [],
          directionQuery: {
            field: "likes",
            type: "desc",
          },
        }}
      />
      <Typography
        sx={{
          my: 3,
        }}
        variant="h1"
        component="h2"
      >
        Recommends
      </Typography>
      <Filter
        RenderComponent={RecommendsRecipes}
        query={{
          searchQuery: "",
          tagQuery: [],
          directionQuery: {
            field: "",
            type: "asc",
          },
        }}
      />
    </Page>
  );
};

export default HomePage;
