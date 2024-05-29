// Main.jsx
import React, { useContext } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResults, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.profile_icon} alt="User Icon" />
      </div>
      <div className="mainc">
        {!showResults ? (
         <>
         <div className="greet">
           <p><span>Hello, Dev.</span></p>
           <p>How can I help you today?</p>
         </div>
         <div className="cards">
           <div className="card">
             <p>Suggest beautiful places to see on an upcoming road trip</p>
             <img src={assets.compass_icon} alt="Compass Icon" />
           </div>
           <div className="card">
             <p>Come up with a recipe for an upcoming event</p>
             <img src={assets.bulb_icon} alt="Bulb Icon" />
           </div>
           <div className="card">
             <p>Help design a database schema for a business</p>
             <img src={assets.code_icon} alt="Code Icon" />
           </div>
           <div className="card">
             <p>Explain the key rules of rugby, starting with the basics</p>
             <img src={assets.message_icon} alt="Message Icon" />
           </div>
         </div>
       </>
        ) : (
          <div className="result">
         <div className="rt">
          <img src={assets.profile_icon} alt="" />
          <p>{recentPrompt}</p>
         </div>
         <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading? <div className="loader">
<hr />
<hr />
<hr />
          </div>
          : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
      }
         
         </div>
       </div>
         
        )}
        <div className="mt">
          <div className="sb">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input?
              <img  className= "send"src={assets.send_icon} onClick={onSent} alt="Send Icon" />:null}
            </div>
          </div>
          <p className="bi">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
