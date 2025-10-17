"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { A } from "../../components/a";
import data from "./downloads.json";

const CustomLegend = (props: any) => {
  const { payload, isDark } = props;

  const packageUrls: Record<string, string> = {
    openai: "https://www.npmjs.com/package/openai",
    ai: "https://ai-sdk.dev",
    "@anthropic-ai/sdk": "https://www.npmjs.com/package/@anthropic-ai/sdk",
    "@google/genai": "https://www.npmjs.com/package/@google/genai",
  };

  return (
    <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-6">
      {payload.map((entry: any, index: number) => {
        // Use different logo URLs based on the package
        const logoUrl =
          entry.value === "ai"
            ? "https://cdn.simpleicons.org/vercel" // Base URL without color
            : entry.value === "openai"
            ? `https://cdn.simpleicons.org/openai/${
                isDark ? "a3a3a3" : "737373"
              }`
            : entry.value === "@anthropic-ai/sdk"
            ? "https://cdn.simpleicons.org/anthropic/c2410c"
            : "https://cdn.simpleicons.org/google/ca8a04";

        return (
          <a
            key={`legend-${index}`}
            href={packageUrls[entry.value]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <img
              src={logoUrl}
              alt={entry.value}
              className={
                entry.value === "ai"
                  ? "w-4 h-4 dark:invert dark:opacity-85"
                  : "w-4 h-4"
              }
            />
            <span
              className={`font-mono text-xs whitespace-nowrap ${
                entry.colorClass || ""
              }`}
              style={{
                color: entry.color || undefined,
              }}
            >
              `
              <span
                className="border-b border-transparent group-hover:border-dotted transition-colors"
                style={{
                  borderBottomColor: "transparent",
                }}
                onMouseEnter={e => {
                  const color =
                    entry.color ||
                    (entry.value === "ai"
                      ? isDark
                        ? "#d4d4d4"
                        : "#000000"
                      : undefined);
                  if (color) {
                    e.currentTarget.style.borderBottomColor = color + "80";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {entry.value}
              </span>
              `
            </span>
          </a>
        );
      })}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg p-3 font-mono text-xs">
        <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
          {new Date(label).toLocaleDateString()}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`tooltip-${index}`}
            style={{ color: entry.color }}
            className="mb-1"
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Chart() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount and when it changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    // Set initial value
    setIsDark(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const generateTicks = () => {
    if (data.length === 0) return [];

    // Get every 8th data point to show approximately every 2 months
    const tickIndices: number[] = [];
    for (let i = 0; i < data.length; i += 8) {
      tickIndices.push(i);
    }
    // Always include the last point
    if (tickIndices[tickIndices.length - 1] !== data.length - 1) {
      tickIndices.push(data.length - 1);
    }

    return tickIndices.map(i => data[i].date);
  };

  const ticks = generateTicks();

  return (
    <div className="relative my-12 lg:-mx-20 overflow-x-auto focus:outline-none">
      <style jsx>{`
        .chart-container :global(svg) {
          outline: none !important;
        }
        .chart-container :global(svg:focus) {
          outline: none !important;
        }
      `}</style>
      <div className="chart-container w-full max-w-4xl mx-auto border border-neutral-300 dark:border-neutral-700 p-3 sm:p-6 focus:outline-none">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="none" />
            <XAxis
              dataKey="date"
              ticks={ticks}
              tickFormatter={value => {
                const date = new Date(value);
                const month = date.toLocaleString("en-US", { month: "short" });
                const year = date.getFullYear().toString().slice(-2);
                return `${month} '${year}`;
              }}
              className="text-xs"
              tick={{ dy: 10, fill: isDark ? "#737373" : "#666666" }}
            />
            <YAxis
              domain={[0, 7500000]}
              tickFormatter={value => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value.toString();
              }}
              className="text-xs"
              tick={{ dx: -2, fill: isDark ? "#737373" : "#666666" }}
              width={35}
              tickCount={8}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="ai"
              stroke={isDark ? "#d4d4d4" : "#000000"}
              strokeWidth={2}
              dot={false}
              name="ai"
              strokeOpacity={1}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="openai"
              stroke={isDark ? "#a3a3a3" : "#737373"}
              strokeWidth={2}
              dot={false}
              name="openai"
              strokeOpacity={1}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="@anthropic-ai/sdk"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              name="@anthropic-ai/sdk"
              strokeOpacity={1}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="@google/genai"
              stroke="#eab308"
              strokeWidth={2}
              dot={false}
              name="@google/genai"
              strokeOpacity={1}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
        <CustomLegend
          isDark={isDark}
          payload={[
            { value: "openai", color: isDark ? "#a3a3a3" : "#737373" },
            { value: "ai", colorClass: "text-black dark:text-neutral-300" },
            { value: "@anthropic-ai/sdk", color: "#dc2626" },
            { value: "@google/genai", color: "#eab308" },
          ]}
        />
      </div>
      <p className="text-center mt-4 px-4 font-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <A href="https://ai-sdk.dev">AI SDK</A> is now the #2 largest SDK for AI
        in JS/TS, but, crucially, one that's model and provider agnostic
      </p>
    </div>
  );
}
