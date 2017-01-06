import YouTube from 'react-youtube'

export default (props) => (
  <div>
    <YouTube {...withDefault(props)} />
    <style jsx>{`
      div {
        margin: 15px 0;
      }
    `}</style>
  </div>
)

const withDefault = (props) => (
  Object.assign({}, props, {
    opts: Object.assign({}, props.opts || {}, {
      width: '100%'
    })
  })
)
