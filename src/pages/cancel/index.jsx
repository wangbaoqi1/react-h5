import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import ModalSelect from '@/components/modal-select';

import './index.less';


const Cancel = () => {
  const [reason, setReason] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div className="cancel">
      <div className="cancel-reason">
        <div className="cancel-reason-title">
          <h3>注销原因</h3>
          <div className="cancel-reason-title-require">(必填)</div>
        </div>
        <div
          className="cancel-reason-button"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="cancel-reason-text">测试空间几何或或或或或或或或或或或或或或或或或或或或或</div>
        </div>
      </div>
      <div className="cancel-desc">
        <h3>注销备注</h3>
        <textarea
          maxLength={100}
          className="input"
          placeholder="请输入您注销的原因，以便我们优化软件哦~(100字以内)"
          value={suggestion}
          onChange={({ target }) => setSuggestion(target.value)}
        />
      </div>
      <button
        className="cancel-button"
        disabled={false}
        onClick={() => {}}
      >
        提交
      </button>
    </div>
  );
};

export default Cancel;
ReactDom.render(<Cancel />, document.querySelector('#J_Container'));
