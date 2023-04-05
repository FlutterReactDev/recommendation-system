import { Page, RecipeCard, RecipeCardSkeleton, SearchBar, SelectInput } from "@components";
import { RecipeCardProps } from "@components/RecipeCard/RecipeCard";
import { Filter } from "@features";
import { FilterQuery } from "@features/Filter/Filter";
import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import RecipesService from "@service/recipes";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { container } from "tsyringe";
const RecipesPage: FC = () => {
  useEffect(() => {
    const recipesService = container.resolve(RecipesService);
    recipesService.getAllTags().then((tags) => {
      setTags(tags);
    });
  }, []);
  const [query, setQuery] = useState<FilterQuery>({
    searchQuery: "",
    tagQuery: [],
    directionQuery: {
      field: "",
      type: "asc",
    },
  });
  const [tags, setTags] = useState<string[]>();

  const RenderComponent: FC<{
    recipes: RecipeCardProps[] | undefined;
  }> = (props) => {
    const { recipes } = props;

    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {recipes?.length ? (
          recipes.map((repice) => {
            return (
              <Grid item xs={12} sm={4} md={4} key={repice.id}>
                <RecipeCard {...repice} />
              </Grid>
            );
          })
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
      </Grid>
    );
  };

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery((prevState) => {
      return { ...prevState, searchQuery: event.target.value };
    });
  }

  function onSelectChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event;
    setQuery((prevState) => {
      return {
        ...prevState,
        tagQuery: typeof value === "string" ? value.split(",") : value,
      };
    });
  }

  return (
    <Page title="Recipes">
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SearchBar value={query.searchQuery} setQuery={onInputChange} />
          <SelectInput
            tags={tags}
            value={query.tagQuery}
            onSelectChange={onSelectChange}
            label="Tags"
          />
        </Box>
        <Filter query={query} RenderComponent={RenderComponent} />
      </Container>
    </Page>
  );
};

export default RecipesPage;
