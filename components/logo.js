const Logo = () => (
  <span>
    <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h19v19H0z" fill="#000" fillRule="evenodd" />
    </svg>
    rauchg.com
    <style jsx>{`
      span {
        font-weight: bold;
        font-size: 18px;
        display: inline-flex;
        align-items: center;
        height: 30px;
        line-height: 20px;
        padding: 10px;
      }

      svg {
        margin-right: 10px;
      }
    `}</style>
  </span>
);

export default Logo;
