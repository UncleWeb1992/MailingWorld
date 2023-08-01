import { IconType } from "react-icons/lib";

export enum MessageFields {
  Draft = "Черновики",
  Cart = "Корзина",
  Send = "Отправленные",
  Incoming = "Входящие",
  Spam = "Спам",
}

export interface LinkChildrenType {
  title: string;
  parent: MessageFields;
  children: this[] | null;
}

export interface SidebarLinks {
  title: MessageFields;
  Icon: IconType;
  children: LinkChildrenType[] | null;
}

export interface MessageType {
  id: string;
  autor: string;
  date: number;
  body: string;
  type: MessageFields;
  field: string;
  read: boolean;
  address: string;
}
