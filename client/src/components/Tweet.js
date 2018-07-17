import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//prettier-ignore
const Tweet = props => {
  console.log(props);
  return (
    <div>
      <Card>
        <CardMedia
          image={props.profile_image_url}
          title="Profile Image"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            <strong>{props.name}</strong>
          </Typography>
          <Typography component="p">
            {props.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Favorite Count {props.favorite_count}
          </Button>
          <Button size="small" color="primary">
            Retweets {props.retweet_count}
          </Button>
        </CardActions>
      </Card>
    </div>
)};

export default Tweet;
