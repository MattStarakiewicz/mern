import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { editPostRequest } from "../../PostActions";
import { injectIntl } from "react-intl";

// Import Style
import styles from "./PostListItem.css";

function PostListItem(props) {
  return (
    <div className={styles["single-post"]}>
      <h3 className={styles["post-title"]}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`}>
          {props.post.title}
        </Link>
      </h3>
      <p className={styles["author-name"]}>
        <FormattedMessage id="by" /> {props.post.name}
      </p>
      <p className={styles["post-desc"]}>{props.post.content}</p>
      <p className={styles["post-action"]}>
        <a href="#" onClick={props.onDelete}>
          <FormattedMessage id="deletePost" />
        </a>
      </p>
      <button
        onClick={() => {
          console.log(props.post)
          props.post.voteCount = props.post.voteCount + 1;
          props.editPostRequest({
            ...props.post,
            voteCount: props.post.voteCount
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          props.post.voteCount = props.post.voteCount - 1;
          props.editPostRequest({
            ...props.post,
            voteCount: props.post.voteCount
          });
          console.log(props.post.voteCount)
        }}
      >
        -
      </button>
      <p>{props.post.voteCount}</p>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch, props) {
  return {
    editPostRequest: post => dispatch(editPostRequest(post.cuid, post))
  };
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PostListItem));
