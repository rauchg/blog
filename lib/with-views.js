import React from 'react'
import db from './db'

// expose `fetch()` to node
import 'isomorphic-fetch'

const withViews = (fn) => (
  class extends React.Component {
    static async getInitialProps ({ pathname }) {
      const id = pathname
        // remove leading `/`
        .substr(1)
        // replace the `/` after the year with a `-`
        .replace(/(\d+)\//, '$1-')

      // fetch views
      const ref = db.ref('views').child(id)
      const views = await ref.once('value')

      // register a view asynchronously
      fetch('https://rauchg-blog-views.now.sh/?id=' + encodeURIComponent(id))
      .catch((err) => console.error('view save error:', err.stack))

      return {
        postId: id,
        views: views.val()
      }
    }

    constructor (props) {
      super(props)
      this.state = Object.assign({}, props)
      this.onViews = this.onViews.bind(this)
    }

    componentDidMount () {
      const { postId } = this.props
      db.ref('views').child(postId).on('value', this.onViews)
    }

    componentWillUnmount () {
      const { postId } = this.props
      db.ref('views').child(postId).off('value', this.onViews)
    }

    onViews (views) {
      this.setState({ views: views.val() })
    }

    render () {
      return fn(this.state)
    }
  }
)

export default withViews

