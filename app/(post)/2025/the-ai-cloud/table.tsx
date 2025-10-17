import { A } from '../../components/a'

export function Table() {
  return (
    <div className="relative my-12 lg:-mx-20 overflow-x-auto">
      <table className="w-full max-w-4xl mx-auto border-collapse border border-neutral-300 dark:border-neutral-700">
        <thead>
          <tr className="bg-neutral-100 dark:bg-neutral-900">
            <th className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-left font-semibold text-sm sm:text-base">
              Traditional Cloud
            </th>
            <th className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-left font-semibold text-sm sm:text-base">
              AI Cloud
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Static & semi-static UI
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                One-shot responses
              </span>
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Full dynamic & generative UI
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <A href="https://vercel.com/docs/functions/streaming-functions">Streaming responses</A>
              </span>
            </td>
          </tr>
          <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Framework for UI & Pages
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                React / Next.js
              </span>
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Framework for AI & Agents
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <A href="https://ai-sdk.dev">AI SDK</A>
              </span>
            </td>
          </tr>
          <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              CDN of Pixels
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                CloudFront
              </span>
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              CDN of Tokens
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <A href="https://vercel.com/ai-gateway">AI Gateway</A>
              </span>
            </td>
          </tr>
          <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Compute for Human-written Code
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                EC2
              </span>
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Compute for Agent-written Code
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <A href="https://vercel.com/docs/vercel-sandbox">Sandbox</A>
              </span>
            </td>
          </tr>
          <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Foreground Compute
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Quick / CPU-bound (Lambda)
              </span>
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-3 sm:px-6 py-3 text-sm sm:text-base">
              Background Compute
              <br />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Long running / IO-bound (<A href="https://vercel.com/fluid">Fluid</A>)
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-center mt-4 px-4 font-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        Traditional cloud services and frameworks are foundational — they're not
        going away
      </p>
    </div>
  );
}
