import Client from "./components/client";

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.category);
  return {
    title: category,
    keywords: category,
    alternates: {
      canonical: `https://inkquest.in/category/${params.category}`,
    },
  };
}
function Category({ params }) {
  return (
    <div className=" dark:bg-black">
      <Client props={params} />
    </div>
  );
}

export default Category;
