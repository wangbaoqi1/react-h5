import React from 'react';
import './index.less';

const FooterButton = ({ disabled, onClick }) => {
  return (
    <div>
      {disabled ? (
        <button className="footer-button">确认反馈</button>
      ) : (
        <button className="footer-button-onclick" onClick={onClick}>
          <img
            className="footer-button-img"
            src="//s.lianmeihu.com/x-uploader/image/2022-03-18/a43e80c64406fd948505bb9108967cf8"
          />
          确认反馈
        </button>
      )}
    </div>
  );
};

export default FooterButton;
