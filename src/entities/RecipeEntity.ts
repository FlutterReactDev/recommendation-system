import { DocumentReference } from "firebase/firestore";
import * as Yup from "yup";
import { UserEntity } from "./UserEntity";

export const RECIPE_DATA_SCHEMA = Yup.object({
  name: Yup.string().required(),
  imgUrl: Yup.string().required(),
  tags: Yup.array().of(Yup.string().required()).required(),
  description: Yup.string().required(),
  timestamp: Yup.date().required(),
});

export type RecipeEntity = Yup.InferType<typeof RECIPE_DATA_SCHEMA> & {
  author: DocumentReference<UserEntity>;
  likes: DocumentReference<UserEntity>[];
};
