import Image from "next/image";
import Link from "next/link";

async function NewsList({ data }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mt-3">News</h1>
      <div>
        {data.map((value) => (
          <div key={value.id} className="grid grid-cols-3 gap-2 my-3">
            <Image
              width="400"
              height="300"
              src={value.Title_image}
              className="col-span-1"
              alt="image"
            />
            <p className="col-span-2">
              <Link
                href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                  " ",
                  "-"
                )}`}
              >
                {value.Title}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
