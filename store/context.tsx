import { createContext, useState, useEffect, Children } from "react";
import { Data, ContextType } from "../types/interfaces";
import { PreInfoType } from "../types/types";

const Context = createContext<ContextType>({
  data: PreInfoType,
  getData(arg) {},
  session: "",
  getSession(arg) {},
  isLoading: true,
  setIsLoading(arg: boolean) {},
  apiData: undefined,
  setApiData(arg) {},
});

export default Context;

export const Provider = function ({ children }: { children: any }) {
  const [data, setData] = useState<Data>();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);
  const [apiData, setAPIData] = useState<Data[]>([]);

  function getData(arg: Data) {
    setData(arg);
  }

  function getSession(arg: any) {
    setSession(arg);
  }

  function setIsLoading(arg: boolean) {
    setLoading(arg);
  }

  function setApiData(arg: Data[]) {
    setAPIData(arg);
  }

  useEffect(() => {}, []);

  const context: ContextType = {
    data,
    session,
    getData,
    getSession,
    isLoading: loading,
    setIsLoading,
    apiData,
    setApiData,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
