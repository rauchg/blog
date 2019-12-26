const Logo = () => (
  <span>
    <svg width={19} height={19}>
      <defs>
        <linearGradient x1="83.228824%" y1="134.11287%" x2="50%" y2="100%" id="a">
          <stop stopColor="#FFF" offset="0%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M31 29h19v19H31z"
        transform="translate(-31 -29)"
        fill="url(#a)"
        fillRule="evenodd"
      />
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
