import { AppContext } from "./AppContext";
import { useContext } from "react";

const useAppContext = () => useContext(AppContext);

export { useAppContext };
