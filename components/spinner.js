import React from 'react'

export default function Spinner({ color, className, size }) {
  const bars = []

  for (let i = 0; i < 12; i++) {
    const barStyle = {}
    barStyle.animationDelay = (i - 12) / 10 + 's'
    barStyle.transform = 'rotate(' + i * 30 + 'deg) translate(146%)'
    bars.push(<div style={barStyle} className="react-spinner_bar" key={i} />)
  }

  return (
    <div className={`wrapper${className ? ' ' + className : ''}`}>
      <div className="react-spinner">{bars}</div>
      <style jsx>
        {`
          .wrapper {
            height: ${size}px;
            width: ${size}px;
          }

          .react-spinner {
            height: ${size}px;
            left: 50%;
            position: relative;
            top: 50%;
            width: ${size}px;
          }

          .react-spinner :global(.react-spinner_bar) {
            animation: react-spinner_spin 1.2s linear infinite;
            background-color: ${color};
            border-radius: 5px;
            height: 8%;
            left: -10%;
            position: absolute;
            top: -3.9%;
            width: 24%;
          }

          @keyframes react-spinner_spin {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0.15;
            }
          }
        `}
      </style>
    </div>
  )
}
