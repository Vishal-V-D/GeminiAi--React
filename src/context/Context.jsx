import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextword) => {
    setTimeout(() => {
      setResultData(prev => prev + nextword);
    }, 75 * index);
  };
const newchat =()=>{
  setLoading(false)
  setShowResults(false)
}
  const onSent = async () => {
    try {
      setResultData("");
      setLoading(true);
      setShowResults(true);
      let response;

      if (input !== "") {
        response = await run(input);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]);
      }

      if (response) {
        let responsearray = response.split("*");
        let newresponse = "";
        
        for (let i = 0; i < responsearray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newresponse += responsearray[i];
          } else {
            newresponse += "<b>" + responsearray[i] + "</b>";
          }
        }

        let newresponse2 = newresponse.split("*").join("<br/>");
        let newresponsearray = newresponse2.split(" ");

        for (let i = 0; i < newresponsearray.length; i++) {
          const nextword = newresponsearray[i];
          delaypara(i, nextword + " ");
        }
      }

      setLoading(false);
      setInput("");
    } catch (error) {
      console.error("Error during AI interaction:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    newchat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
