import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Logapriya",
    lastName: "Sampath Kumar",
    username: "loga@1612",
    password: "1612",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Priya",
    lastName: "Sampath Kumar",
    username: "priya@1612",
    password: "12",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
