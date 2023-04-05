import { RecipeCardProps } from "@components/RecipeCard/RecipeCard";
import RecipesService from "@service/recipes";
import { OrderByDirection } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { container } from "tsyringe";

export interface FilterQuery {
  searchQuery: string | undefined;
  tagQuery: string[] | undefined;
  directionQuery: DirectionQuery;
}

export interface DirectionQuery {
  field: string;
  type: OrderByDirection;
}

export interface FilterProps {
  RenderComponent: FC<{
    recipes: RecipeCardProps[] | undefined;
  }>;
  query: FilterQuery;
}

const Filter: FC<FilterProps> = (props) => {
  const { RenderComponent, query } = props;
  const [data, setData] = useState<RecipeCardProps[]>();

  useEffect(() => {
    const recipesService = container.resolve(RecipesService);
    recipesService.getRecipesFilter(query).then((recipes) => {
      setData(recipes);
    });
  }, []);

  useEffect(() => {
    const recipesService = container.resolve(RecipesService);
    recipesService.getRecipesFilter(query).then((recipes) => {
      setData(recipes);
    });
  }, [query.searchQuery, query.tagQuery]);

  return <RenderComponent recipes={data} />;
};

export default Filter;
