import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
 render() {
 let commentNodes = this.props.data.map(comment => {
 return (
 <Comment author={ comment.author }uniqueID={ comment['_id'] }
     onCommentDelete={ this.props.onCommentDelete }
 onCommentUpdate={ this.props.onCommentUpdate }
     key={ comment['_id'] }>
 { comment.text}
 </Comment>
 )
 })
 return (
 <div>
 { commentNodes }
     <style jsx>{`
      div {
 width:80vw;
 margin: 0 auto;
 fontFamily: Helvetica, sans-serif ;
 }
    `}</style>
 </div>
 )
 }
}
export default CommentList;
