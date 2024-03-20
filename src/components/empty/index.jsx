import React from 'react';
import './index.less';

const Empty = ({ emptyText = '啊哦~这里是空的' }) => {
  return (
    <div className="empty">
      <img
        className="no-image"
        src="//s.lianmeihu.com/x-uploader/image/2022-03-14/7f200a216a9cc2ce8809a6f893255ad0"
      />
      <div className="no-text">{emptyText}</div>
    </div>
  );
};

export default Empty;
