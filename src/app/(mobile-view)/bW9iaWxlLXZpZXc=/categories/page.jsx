import Image from "next/image";
import Link from "next/link";
import crime from "@/../public/category-img/crime.jpeg";
import entertainment from "@/../public/category-img/entertainment.jpeg";
import worldCup from "@/../public/category-img/world-cup.jpg";
import politics from "@/../public/category-img/politics.jpg";

function Categories() {
  return (
    <div className="p-2">
      <h1 className="text-3xl mb-3 font-semibold">Categories</h1>
      <div className="grid grid-cols-2 gap-3 font-semibold">
        <div className="relative ">
          <Link href="/bW9iaWxlLXZpZXc=/categories/Sports">
            <Image
              src={crime}
              width="250"
              height="250"
              alt="image"
              className="rounded-lg h-[150px] w-[250px]"
              placeholder="blur"
            />
            <div className="absolute top-1 left-2 text-xl">Crime</div>
          </Link>
        </div>
        <div className="relative ">
          <Link href="/bW9iaWxlLXZpZXc=/categories/Entertainment">
            <Image
              src={entertainment}
              width="250"
              height="250"
              alt="image"
              className="rounded-lg h-[150px] w-[250px]"
              placeholder="blur"
            />
            <div className="absolute top-1 left-2 text-xl">Entertainment</div>
          </Link>
        </div>
        <div className="relative ">
          <Link href="/bW9iaWxlLXZpZXc=/categories/World-cup">
            <Image
              src={worldCup}
              width="250"
              height="250"
              alt="image"
              className="rounded-lg h-[150px] w-[250px]"
              placeholder="blur"
            />
            <div className="absolute top-1 left-2 text-xl">World Cup</div>
          </Link>
        </div>
        <div className="relative ">
          <Link href="/bW9iaWxlLXZpZXc=/categories/Politics">
            <Image
              src={politics}
              width="250"
              height="250"
              alt="image"
              className="rounded-lg h-[150px] w-[250px]"
              placeholder="blur"
            />
            <div className="absolute top-1 left-2 text-xl">Politics</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
