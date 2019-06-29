import React from "react";
import { fetchPost, editPostRequest } from "../../PostActions";
import {connect} from 'react-redux'
import { toggleEditPost } from "../../../App/AppActions";
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types'
import Helmet from "react-helmet";
import {getPost, getShowEditPost} from '../../PostReducer'
import styles from '../../components/PostListItem/PostListItem.css'

class PostDetailPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.post)
    this.state = {
      name: this.props.post.name,
      title: this.props.post.title,
      content: this.props.post.content
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  renderPostForm = () => {
    return (
      <div className={styles["form-content"]}>
        <h2 className={styles["form-title"]}>
          <FormattedMessage id="editPost" />
        </h2>
        <input
          placeholder={this.props.intl.messages.authorName}
          className={styles["form-field"]}
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input
          placeholder={this.props.intl.messages.postTitle}
          className={styles["form-field"]}
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <textarea
          placeholder={this.props.intl.messages.postContent}
          className={styles["form-field"]}
          name="content"
          value={this.state.content}
          onChange={this.handleInputChange}
        />
        <a
          className={styles["post-submit-button"]}
          href="#"
          onClick={this.handleEditPost}
        >
          <FormattedMessage id="submit" />
        </a>
      </div>
    );
  };

  renderPost = () => {
    return (
      <div className={`${styles["single-post"]} ${styles["post-detail"]}`}>
        <h3 className={styles["post-title"]}>{this.props.post.title}</h3>
        <p className={styles["author-name"]}>
          <FormattedMessage id="by" /> {this.props.post.name}
        </p>
        <p className={styles["post-desc"]}>{this.props.post.content}</p>
      </div>
    );
  };

  handleEditPost = () => {
    this.props.toggleEditPost();
    this.props.editPostRequest(this.state);
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <a
          className={styles["edit-post-button"]}
          href="#"
          onClick={this.props.toggleEditPost}
        >
          <FormattedMessage id="editPost" />
        </a>
        {this.props.showEditPost ? this.renderPostForm() : this.renderPost()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    toggleEditPost: () => dispatch(toggleEditPost()),
    editPostRequest: post => dispatch(editPostRequest(props.params.cuid, post))
  };
}

function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    showEditPost: getShowEditPost(state)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.shape({
      authorName: PropTypes.string.isRequired,
      postTitle: PropTypes.string.isRequired,
      postContent: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  showEditPost: PropTypes.bool.isRequired,
  toggleEditPost: PropTypes.func.isRequired,
  editPostRequest: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PostDetailPage));
