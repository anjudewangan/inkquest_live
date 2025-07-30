import prisma from "./db";
/**
 *
 * @param {String} category Category for news
 * @param {Number} limit Number of news to return
 * @returns Array of news
 */
export async function categoryTopNews(category, limit) {
  if (!category && !limit) {
    throw Error("category and limit are required");
  }
  const query = {
    where: {
      Category: {
        has: category,
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      Title: true,
      local_image_url: true,
      Title_image: true,
      updatedAt: true,
      createdAt: true,
      currentDate: true,
      Heading: true,
      Category: true,
      Author: true,
      id: true,
      Title: true,
      local_image_url: true,
      Title_image: true,
      updatedAt: true,
      createdAt: true,
      currentDate: true,
      Heading: true,
      Category: true,
      Author: true,
    },
    take: limit,
  };
  const news = await prisma.all_news.findMany(query);
  return news;
}

/**
 *
 * @param {Number} limit Number of news to return
 * @returns Array of latest trending news
 */
export async function recentTrendingNews(limit) {
  const pipeline = [
    {
      $match: {
        $and: [
          { createdAt: { $exists: true } },
          { Sub_category: { $in: ["trending"] } },
        ],
      },
    },
  ];
  const news = await prisma.all_news.aggregateRaw({
    pipeline: [
      ...pipeline,
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          Title: 1,
          local_image_url: 1,
          Title_image: 1,
          updatedAt: 1,
          createdAt: 1,
          currentDate: 1,
          Heading: 1,
          Category: 1,
          Author: 1,
        },
      },
    ],
  });
  return news;
}
