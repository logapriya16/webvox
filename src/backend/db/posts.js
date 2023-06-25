import { v4 as uuid } from "uuid";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "loga@1612",
    createdAt: "2023-05-12",
    updatedAt: new Date(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas ",
    likes: {
      likeCount: 7,
      likedBy: [],
      dislikedBy: [],
    },
    username: "priya@1612",
    createdAt: "2023-04-12",
    updatedAt: new Date(),
  },
];
