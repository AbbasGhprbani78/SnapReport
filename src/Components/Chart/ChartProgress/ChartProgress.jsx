import React from "react";
import "./ChartProgress.css";

export default function ChartProgress({ percent, title }) {
    const strokeWidth = 8
    const radius = 50 - strokeWidth / 2;
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;

    const gradientId = "progressGradient";
    const gradientColorStart = "#a357f7";
    const gradientColorEnd = "#4f7af6";

    return (
        <div className="chartProgress-content">
            <p className='progress-title'>{title}</p>
            <div className="chart-progress-main">
                <svg
                    className={"CircularProgressbar"}
                    viewBox="0 0 100 100"
                    width={190}
                    height={190}
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={gradientColorStart} />
                            <stop offset="100%" stopColor={gradientColorEnd} />
                        </linearGradient>
                    </defs>

                    <path
                        className="CircularProgressbar-trail"
                        d={pathDescription}
                        strokeWidth={strokeWidth}
                        fillOpacity={0}
                        style={{
                            stroke: "#d6d6d6"
                        }}
                    />

                    <path
                        className="CircularProgressbar-path"
                        d={pathDescription}
                        strokeWidth={strokeWidth}
                        fillOpacity={0}
                        style={{
                            stroke: `url(#${gradientId})`,
                            strokeLinecap: "round",
                            strokeDasharray: `${diameter}px ${diameter}px`,
                            strokeDashoffset: `${((100 - percent) / 100) * diameter}px`
                        }}
                    />

                    <text
                        className="CircularProgressbar-text"
                        x={50}
                        y={50}
                        style={{
                            fill: "#000",
                            fontSize: "20px",
                            dominantBaseline: "central",
                            textAnchor: "middle"
                        }}
                    >
                        {`${percent}%`}
                    </text>
                </svg>
            </div>
        </div>
    );
}
