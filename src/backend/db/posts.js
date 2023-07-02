import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */
export const posts = [
  {
    _id: uuid(),
    content:
    "To fall in love with yourself is the first secret to happiness.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sanju@12",
    createdAt: new Date("2023-05-04"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Escape the ordinary and stay crazy",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "daniel@67",
    createdAt: new Date("2023-04-12"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "A recipe has no soul. You, as the cook, must bring the soul to the recipe ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "koshi@12",
    createdAt: new Date("2023-01-9"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "You must be the change you wish to see in the world....",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "loga@1612",
    createdAt: new Date("2022-12-08"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "A fit body, a calm mind, a house full of love ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "emmy@9",
    createdAt: new Date("2022-09-02"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Find the Prospective that transforms the ordinary into the extraordinary",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "emmi@9",
    createdAt: new Date("2023-07-12"),
    updatedAt: formatDate(),
  },
];
