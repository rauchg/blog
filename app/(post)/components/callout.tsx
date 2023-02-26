export const Callout = ({ emoji, text }) => (
  <div className="bg-gray-200 flex items-center p-3 my-6 text-base">
    <span className="block w-6 text-center text-xl mr-2">{emoji}</span>
    <span className="block grow">{text}</span>
  </div>
);
