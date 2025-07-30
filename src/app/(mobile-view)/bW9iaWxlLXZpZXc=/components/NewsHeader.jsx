import { categories } from "@/lib/mappings";

function NewsHeader() {
  return (
    <div className="flex gap-2 overflow-y-auto no-scrollbar mt-2">
      <ul className="flex gap-4 ml-3 whitespace-pre">
        {Object.keys(categories).map((key) => (
          <li
            className="px-2 -skew-x-12 border border-violet-600 w-full text-lg "
            key={key}
          >
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsHeader;
