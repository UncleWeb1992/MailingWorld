import { useEffect, useLayoutEffect } from "react";
import AppRoute from "./components/AppRoute/AppRoute";
import { LK_KEYS } from "./constants/constants";
import { useAppDispatch, useAppSelector } from "./hook/redux";
import { setMessages } from "./store/Slices/MailSlice";
import { setUserName } from "./store/Slices/UserSlice";
import { LoginForm } from "./components/ui/LoginForm";
import { MessageForm } from "./components/ui/MessageForm";
import { Loader } from "./components/common/Loader";
import { setFields, setLoading } from "./store/Slices/AppSlice";

function App() {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.mail);
  const { name } = useAppSelector((state) => state.user);
  const { loading, fiedls } = useAppSelector((state) => state.app);

  useEffect(() => {
    const saveMessages = () => {
      localStorage.setItem(LK_KEYS.Messages, JSON.stringify(messages));
    };

    const saveFields = () => {
      localStorage.setItem(LK_KEYS.Fields, JSON.stringify(fiedls));
    };

    saveFields();
    saveMessages();
  }, [fiedls, messages]);

  useLayoutEffect(() => {
    const msgs = localStorage.getItem(LK_KEYS.Messages);
    const user = localStorage.getItem(LK_KEYS.User);
    const fields = localStorage.getItem(LK_KEYS.Fields);

    if (msgs) {
      dispatch(setMessages(JSON.parse(msgs)));
    }

    if (user) {
      dispatch(setUserName(user));
    }

    if (fields) {
      dispatch(setFields(JSON.parse(fields)));
    }

    dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!name.length) {
    return <LoginForm />;
  }

  return (
    <div className="app">
      <MessageForm />
      <AppRoute />
    </div>
  );
}

export default App;
