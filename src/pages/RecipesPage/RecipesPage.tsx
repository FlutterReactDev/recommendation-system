import { Page, RecipeCard } from "@components";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { FC } from "react";

const RecipesPage: FC = () => {
  return (
    <Page title="Recipes">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item>
            <RecipeCard />
          </Grid>
          <Grid item>
            <RecipeCard />
          </Grid>
          <Grid item>
            <RecipeCard />
          </Grid>
          <Grid item>
            <RecipeCard />
          </Grid>
          <Grid item>
            <RecipeCard />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RecipesPage;
