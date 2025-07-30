import Client from "./components/client";

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent(params.tag);
  return {
    title: tag,
    keywords: tag,
    alternates: {
      canonical: `https://inkquest.in/tags/${params.tag}`,
    },
  };
}

function Category({ params }) {
  console.log(decodeURIComponent(params.tag), "params");
  return (
    <div className=" dark:bg-black">
      <Client props={params} />
    </div>
  );
}

export default Category;
