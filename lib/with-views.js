import React from "react";

// TODO: refactor into `useViews()`

const withViews = fn =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({
        db: null,
        views: null,
        postId: null
      });
      this.onViews = this.onViews.bind(this);
    }

    componentDidMount() {
      if (this.state.db == null) {
        const postId = getPostId();

        import("./db")
          .then(({ default: db }) => {
            this.setState({ db, postId });
            db.ref("views")
              .child(postId)
              .on("value", this.onViews);
          })
          .catch(err => {
            console.error(err);
            console.log("firebase failed to load");
          });

        fetch(`/api/view?id=${encodeURIComponent(postId)}`)
          .then(res => res.json())
          .then(({ total, error }) => {
            if (error) {
              console.error("View save error:", error);
            } else {
              console.info("View saved. Total views:", total);
            }
          })
          .catch(err => {
            console.error("View store error", err);
          });
      }
    }

    componentWillUnmount() {
      if (this.state.db) {
        this.state.db
          .ref("views")
          .child(this.state.postId)
          .off("value", this.onViews);
      }
    }

    onViews(views) {
      this.setState({ views: views.val() });
    }

    render() {
      return fn(this.state);
    }
  };

function getPostId() {
  return window.location.pathname.substr(1).replace(/(\d+)\//, "$1-");
}

export default withViews;
