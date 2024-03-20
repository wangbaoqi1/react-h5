import ModalButton from '../modal-button';
import './index.less';

const ModalInput = ({
  visible = false,
  onCancel = () => {},
  onOk = () => {},
  value,
  onChangeText,
  title,
  placeholder,
  maxLength = 18,
}) => {
  if (!visible) {
    return <></>;
  }
  return (
    <div className="modal-input">
      <div className="modalLayer">
        <div className="modal">
          <div className="modal-title">{title}</div>
          <input
            type="text"
            className="modal-input"
            value={value}
            onChange={({ target }) => {
              onChangeText(target.value);
            }}
            placeholder={placeholder || '请输入'}
            maxLength={maxLength}
          />
          <ModalButton
            onCancel={() => onCancel()}
            onOK={() => onOk(value)}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalInput;
