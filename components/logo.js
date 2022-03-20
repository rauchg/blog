const Logo = () => (
  <span>
    <img src="/images/logo.png" style="width:19px; height:19px">
      wangqiwen.xyz
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
