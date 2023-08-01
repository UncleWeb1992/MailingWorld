import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths, routeConfig } from "../../config/routes/routes";

const AppRoute: FC = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route key={route.path} {...route} />
      ))}
      <Route
        path="*"
        element={<Navigate replace to={RoutePaths.MessageList} />}
      />
    </Routes>
  );
};

export default AppRoute;
