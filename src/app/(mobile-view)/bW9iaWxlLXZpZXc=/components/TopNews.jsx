import Image from "next/image";
import Link from "next/link";

async function TopNews({ data }) {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-3">Top News</h1>
      <ul className="grid grid-cols-2 gap-3">
        {data.map((value) => (
          <li className="" key={value.id}>
            <div className="  rounded-lg h-fll">
              <Image
                height="200"
                width="200"
                className="h-[85px] rounded-lg"
                src={
                  value.local_image_url
                    ? value.local_image_url
                    : value.Title_image
                }
                alt="image"
              />
              <div className="p-1">
                <Link
                  href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                    " ",
                    "-"
                  )}`}
                >
                  <p>{value.Title.slice(0, 75)}</p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopNews;
