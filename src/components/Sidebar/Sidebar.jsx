import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const { setRecentPrompt, prevPrompts, onSent,newchat } = useContext(Context);
 
  const loadprompt = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className='side'>
      <div className="top">
        <img className='menu' onClick={() => setExtend(prev => !prev)} src={assets.menu_icon} alt="Menu Icon" />

        <div onClick={()=>newchat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extend ? <p>New Chat</p> : null}
        </div>

        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index}  onClick={()=>loadprompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bt recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bt recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bt recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
