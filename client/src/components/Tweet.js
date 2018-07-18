import React from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//prettier-ignore
class Tweet extends React.Component {
  handleFavorite = async () => {
    await axios.post('/favorite', { data: this.props._id });
  }

  render() {
    const { text, user, name, profile_image_url, created_at, handlePauseStream, handleResumeStream } = this.props;

    return (
      <li
      style={{ maxWidth: 400, margin: '0 auto' }}
      onMouseEnter={handlePauseStream}
      onMouseLeave={handleResumeStream}
      >
        <Card>
        <CardHeader
          avatar={<Avatar src={profile_image_url || user.profile_image_url} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }

          title={name || user.name}
          subheader={created_at}
        />
        <CardContent>
          <Typography component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleFavorite}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </li>
    )
  }
}

export default Tweet;
