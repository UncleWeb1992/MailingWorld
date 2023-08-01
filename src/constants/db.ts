import { MessageFields, MessageType, SidebarLinks } from "../types/types";

import { LuMail } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import { PiNotebook, PiShoppingCartSimple } from "react-icons/pi";
import { BiDislike } from "react-icons/bi";
import { randomId } from "../utils/randomId";

export const githubLink = "https://github.com/UncleWeb1992";

export const SideBarLinks: SidebarLinks[] = [
  {
    title: MessageFields.Incoming,
    Icon: LuMail,
    children: [
      {
        title: "Социальные сети",
        parent: MessageFields.Incoming,
        children: [
          { title: "Net", children: null, parent: MessageFields.Incoming },
        ],
      },
      { title: "Рассылки", children: null, parent: MessageFields.Incoming },
      { title: "Письма себе", children: null, parent: MessageFields.Incoming },
      { title: "Чеки", children: null, parent: MessageFields.Incoming },
    ],
  },
  { title: MessageFields.Send, Icon: VscSend, children: null },
  {
    title: MessageFields.Draft,
    Icon: PiNotebook,
    children: [
      { title: "Резюме", children: null, parent: MessageFields.Draft },
      {
        title: "Отправка тестового задания",
        children: null,
        parent: MessageFields.Draft,
      },
    ],
  },
  { title: MessageFields.Spam, Icon: BiDislike, children: null },
  { title: MessageFields.Cart, Icon: PiShoppingCartSimple, children: null },
];

export const Messages: MessageType[] = [
  {
    id: randomId(),
    autor: "Jon D.",
    date: 1690563265001,
    body: `<p>Hello</p> <stong>My name Jon</stong>`,
    field: MessageFields.Incoming,
    type: MessageFields.Incoming,
    address: "test@mail.ru",
    read: true,
  },
  {
    id: randomId(),
    autor: "Evan M.",
    date: 1690563265001,
    body: `<p>Hello</p> <stong>My name Evan </stong>`,
    field: MessageFields.Send,
    type: MessageFields.Incoming,
    address: "test@mail.ru",
    read: true,
  },
  {
    id: randomId(),
    autor: "Alex M.",
    date: 1690563265001,
    body: `<p>Hello</p> <stong>My name Alex , Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
     deserunt mollit anim id est laborum.</stong>`,
    field: "Чеки",
    type: MessageFields.Incoming,
    read: false,
    address: "test@mail.ru",
  },
];
