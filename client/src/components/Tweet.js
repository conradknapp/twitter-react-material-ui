import React from "react";

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
  state = {
    paused: false
  };

  render() {
    const { text, user, name, profile_image_url, created_at, handlePauseStream, handleResumeStream } = this.props;
    console.log(this.props);
    return (
      <li>
        <Card
          onMouseEnter={handlePauseStream}
          onMouseLeave={handleResumeStream}
          style={{ maxWidth: 400, margin: '0 auto' }}
        >
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
          <IconButton aria-label="Add to favorites">
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
