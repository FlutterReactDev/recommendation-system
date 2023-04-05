import { RecipeEntity } from "@entities/RecipeEntity";
import { UserEntity } from "@entities/UserEntity";
import { db } from "@fb";
import { FilterQuery } from "@features/Filter/Filter";
import { RecipesFormData } from "@features/RecipesForm/RecipesForm";
import { getRelativeTime } from "@utils";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  getDocs,
  DocumentReference,
  getDoc,
  query,
  where,
  orderBy,
  OrderByDirection,
  DocumentData,
  Query,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

class RecipesService {
  constructor() {}

  private checkUserLiked(refs: DocumentReference[], uid: string | undefined) {
    return refs.filter((ref) => ref.id == uid).length;
  }

  private getAvailableFilters(filterQuery: FilterQuery) {
    const availableFilters = [];

    if (filterQuery.tagQuery?.length) {
      availableFilters.push(this.getRecipesByTag(filterQuery.tagQuery));
    }

    if (filterQuery.directionQuery.field && filterQuery.directionQuery.type) {
      availableFilters.push(
        this.getRecipesByDirection(
          filterQuery.directionQuery.field,
          filterQuery.directionQuery.type
        )
      );
    }
    return availableFilters;
  }

  private getRecipesByTag(tagQuery: string[]) {
    return where("tags", "array-contains-any", tagQuery);
  }

  private getRecipesByDirection(field: string, directionStr: OrderByDirection) {
    return orderBy(field, directionStr);
  }

  async getRecipesFilter(filterQuery: FilterQuery) {
    const recipesRef = collection(db, "recipes");
    const availableFilters = this.getAvailableFilters(filterQuery);
    const q = query(recipesRef, ...availableFilters);

    if (filterQuery.searchQuery) {
      return (await this.getRecipes(q)).filter((recipe) => {
        return recipe.name.includes(filterQuery.searchQuery);
      });
    }

    return await this.getRecipes(q);
  }

  async getRecipes(ref: Query<DocumentData>) {
    const recipesRef = await getDocs(ref);
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    const recipes = recipesRef.docs.map(async (doc) => {
      const recipe = doc.data();
      const { name, timestamp, imgUrl, description, tags } = recipe;
      const { author, likes } = recipe;
      const authorRef = await getDoc<UserEntity>(author);
      const time = timestamp.toMillis();

      return {
        name,
        timestamp: getRelativeTime(time),
        imgUrl,
        description,
        author: authorRef.data(),
        tags,
        liked: !!this.checkUserLiked(likes, uid),
        id: doc.id,
      };
    });

    return Promise.all(recipes);
  }

  async postRecipe(data: RecipesFormData) {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (uid) {
      const userRef = doc(db, `users/${uid}`);

      await addDoc(collection(db, "recipes"), {
        ...data,
        author: userRef,
        timestamp: serverTimestamp(),
        likes: [],
      });
    }
  }

  async getAllTags() {
    const tagsRef = doc(db, "tags", "tags");
    const tags: DocumentData | { tags: string[] } | undefined = (
      await getDoc(tagsRef)
    ).data();

    return tags?.tags;
  }

  async addLike(id: string) {
    const recipeRef = doc(db, "recipes", id);
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const userRef = doc(db, `users/${uid}`);
    const recipe: DocumentData | RecipeEntity | undefined = (
      await getDoc(recipeRef)
    ).data();
    const isLiked = this.checkUserLiked(recipe?.likes, uid);

    if (isLiked) {
      await updateDoc(recipeRef, {
        likes: arrayRemove(userRef),
      });

      return;
    }

    await updateDoc(recipeRef, {
      likes: arrayUnion(userRef),
    });
  }

  async getLikedRecipes() {
    const recipesRef = collection(db, "recipes");
    return (await this.getRecipes(recipesRef)).filter(({ liked }) => {
      return liked;
    });
  }
}

export default RecipesService;
