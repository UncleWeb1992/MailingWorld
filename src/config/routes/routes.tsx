import { RouteProps } from "react-router-dom";
import { MessageList } from "../../pages/MessageList";
import { Message } from "../../pages/Message";

export enum AppRoutes {
  MessageList = "MessageList",
  Message = "Message",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MessageList]: "/",
  [AppRoutes.Message]: "/message",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MessageList]: {
    path: RoutePaths.MessageList,
    element: <MessageList />,
  },
  [AppRoutes.Message]: {
    path: RoutePaths.Message,
    element: <Message />,
  },
};
