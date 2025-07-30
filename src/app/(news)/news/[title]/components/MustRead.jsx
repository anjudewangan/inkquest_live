import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";

async function MustRead({ mustRead }) {
  return (
    <div>
      <ul className="mt-5 flex flex-col gap-4">
        {mustRead.map((value) => (
          <Link
            href={`/news/${value.Heading.replaceAll(" ", "-")}`}
            key={value.id}
            prefetch={true}
          >
            <li className="relative my-3">
              <Image
                src={
                  value.local_image_url
                    ? value.local_image_url
                    : value.Title_image
                }
                alt="image"
                height="300"
                width="400"
                className="object-fill rounded-none h-[250px] w-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(300, 300)
                )}`}
              />
              <p className="bg-[#392b95] shadow-md font-semibold py-1 text-white px-6 absolute -bottom-4 w-[85%] left-[50%] -translate-x-[50%]">
                {value.Title.slice(0, 60)} ...
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MustRead;
