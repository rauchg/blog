export default ({ desc, children }) => (
  <div>
    { children }
    {
      desc && <p>
        { desc }
      </p>
    }
    <style jsx>{`
      div {
        text-align: center;
        margin-bottom: 30px;
      }

      p {
        font-size: 13px;
        color: #999;
        margin-top: -15px;
        text-align: center;
        font-style: oblique;
        display: block;
      }
    `}</style>
  </div>
)

const Image = ({ src }) => (
  <div>
    <img src={src} />
    <style jsx>{`
      img {
        max-width: 90%;
        display: block;
        margin: 30px auto;
      }
    `}</style>
  </div>
)

export { Image }
