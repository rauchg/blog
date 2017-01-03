export default ({ desc, children, wide  }) => (
  <div className={ wide && 'wide' }>
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
        text-align: center;
        font-style: oblique;
        display: block;
      }

      .wide {
        background: #F2F2F2;
        position: relative;
      }

      .wide::before {
        width: 10000%;
        content: '';
        left: -1000px;
        height: 100%;
        position: absolute;
        background: #F2F2F2;
        z-index: -1;
      }
    `}</style>
  </div>
)

const Image = ({ src }) => (
  <div>
    <img src={src} />
    <style jsx>{`
      img {
        max-width: 100%;
        margin: 15px 0;
      }
    `}</style>
  </div>
)

export { Image }
