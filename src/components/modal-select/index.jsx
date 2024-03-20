import React from 'react';
import './index.less';

const ModalSelect = ({
  visible = false,
  onCancel = () => {},
  onSelect = () => {},
  actions = [],
}) => {
  if (!visible) {
    return <></>;
  }
  return (
    <div className="modal-select" onClick={onCancel}>
      <div className="modal-select-box">
        {actions.map((action, index) => {
          return (
            <div
              onClick={() => {
                onSelect(action);
              }}
              key={action.key || index}
              className="modal-select-cancel"
              style={
                index === 0
                  ? { borderTopRightRadius: 10, borderTopLeftRadius: 10 }
                  : null
              }
            >
              <div className="modal-select-text">{action.name}</div>
            </div>
          );
        })}
        <div
          className="modal-select-cancel"
          style={{
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onClick={onCancel}
        >
          取消
        </div>
      </div>
    </div>
  );
};

export default ModalSelect;
