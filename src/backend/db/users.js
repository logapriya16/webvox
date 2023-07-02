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
    firstName: "Sanjana",
    lastName: "Prakash",
    username: "sanju@12",
    password: "12",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Larza",
    lastName: "Emmi",
    username: "emmi@09",
    password: "09",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Daniel",
    lastName: "Antony",
    username: "daniel@67",
    password: "67",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Koshika",
    lastName: "Sukumar",
    username: "koshi@12",
    password: "12",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Emmy",
    lastName: "wong",
    username: "emmy@9",
    password: "09",
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
