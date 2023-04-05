import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserEntity } from "@entities/UserEntity";
import { FC } from "react";
import { container } from "tsyringe";
import RecipesService from "@service/recipes";
export interface RecipeCardProps {
  name: string;
  description: string;
  imgUrl: string;
  tags: string[];
  author: UserEntity | undefined;
  liked: boolean;
  timestamp: string;
  id: string;
}

const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { name, description, imgUrl, author, timestamp, liked, id } = props;
  function onLikeClick() {
    const recipesService = container.resolve(RecipesService);
    recipesService.addLike(id);
  }
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={author?.photoUrl ? author?.photoUrl : ""}
          >
            {!author?.photoUrl ? author?.name[0] : ""}
          </Avatar>
        }
        title={name}
        subheader={timestamp.toString()}
      />

      <CardMedia
        onError={(e) => {
          e.currentTarget.src =
            "https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png";
        }}
        component="img"
        height="194"
        image={imgUrl}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color={liked ? "primary" : "default"}
          aria-label="add to favorites"
          onClick={onLikeClick}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
