export function Diagram() {
  return (
    <div className="my-5" style={{ height: "710px" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          background: "#eee",
          padding: "30px 0 35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mobile-diagram-wrapper">
          <SVG />
        </div>
      </div>
    </div>
  );
}

const DIAGRAM_FONT =
  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';

function SVG(props) {
  return (
    <svg width={827} height={655} {...props}>
      <g fill="none" fillRule="evenodd">
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={354} y={14}>
            {"User Request"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={362} y={95}>
            {"Edge Server"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={83} y={289}>
            {"Static Hoisting"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={20} y={320}>
            {"Computation done "}
          </tspan>
          <tspan x={173.6} y={320} textDecoration="underline">
            {"ahead-of-time"}
          </tspan>
          <tspan x={20} y={338}>
            {"and always shared by all edges"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={521.1} y={320}>
            {"Computation done "}
          </tspan>
          <tspan x={674.6} y={320} textDecoration="underline">
            {"just-in-time"}
          </tspan>
          <tspan x={489.4} y={338}>
            {"and partially² shared upon cache HIT"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={568} y={289}>
            {"Proxy to a server¹"}
          </tspan>
        </text>
        <text
          transform="rotate(44 482.5 174)"
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={410} y={179}>
            {"Legacy CDN (JIT)"}
          </tspan>
        </text>
        <text
          transform="rotate(-45 338.5 169)"
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={275} y={174}>
            {"Jamstack (AOT)"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={358.3} y={412}>
            {"Performance"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={356.3} y={476}>
            {"Availability"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={392.4} y={540}>
            {"Cost"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={403}>
            {"\u2713 Optimal performance"}
          </tspan>
          <tspan x={42} y={421}>
            {"\u2713 Faster cache misses"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={468}>
            {"\u2713 Always online"}
          </tspan>
          <tspan x={42} y={486}>
            {"\u2713 Automatic global failover"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={531}>
            {"\u2713 Optimally inexpensive"}
          </tspan>
          <tspan x={42} y={549}>
            {"\u2713 Zero maintenance overhead"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={468}>
            {"\u2A2F Dependent on DevOps / SRE"}
          </tspan>
          <tspan x={535} y={486}>
            {"\u2A2F Expensive HA (multi-AZ)\xB3"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={531}>
            {"\u2A2F Servers constantly running³⁴"}
          </tspan>
          <tspan x={535} y={549}>
            {"\u2A2F DevOps / Monitoring / SRE"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={403}>
            {"\u2A2F Slower cache misses"}
          </tspan>
          <tspan x={535} y={421}>
            {"\u2A2F Impacted by cold boots³"}
          </tspan>
        </text>
        <path
          d="M409 32v24h4l-4.5 9-4.5-9h4V32h1z"
          fill="#000"
          fillRule="nonzero"
        />
        <text fontFamily={DIAGRAM_FONT} fontSize={12} fill="#666">
          <tspan x={2} y={610}>
            {
              "¹ The downsides of this approach apply equally to server-rendering and operating your own static file server"
            }
          </tspan>
          <tspan x={2} y={624}>
            {
              "² Cache hits will be more rare for less-trafficked pages or sites, and will be highly region-dependent "
            }
          </tspan>
          <tspan x={2} y={638}>
            {
              "³ Cold boots can be atenuated by Lambda Provisioning, which drives costs up quite significantly"
            }
          </tspan>
          <tspan x={2} y={652}>
            {
              "⁴ Functions and serverless containers provide natural multi-az, but are subject to higher costs due to [3]"
            }
          </tspan>
        </text>
        <path
          stroke="#979797"
          strokeLinecap="square"
          d="M1.5 371.5h825m-826 68h825m-825 64h825"
        />
        <path
          d="M408.5 120.8l.4.3 118 118 2.8-2.8 3.2 9.6-9.6-3.2 2.8-2.9-118-118-.3-.3.7-.7z"
          fill="#000"
          fillRule="nonzero"
        />
        <path
          d="M408 121.3l.7.7-.3.4-116 117 2.8 2.7-9.6 3.3 3.2-9.6 2.8 2.8 116-117 .4-.3z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}
