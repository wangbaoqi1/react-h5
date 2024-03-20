
import './index.less'

const ModalButton = ({rightText='确定',leftText='取消',onCancel=()=>{},onOK=()=>{},disabled}) => {
    const disable =(className)=>{
        if(disabled)
         return className +'-disabled'
        return className
    }
    console
    return (
        <div className="modal-button">
            <div
                onClick={()=>{
                    onCancel()
                }}
                className="modal-button-left"
            >
                <div className="modal-button-left-button">{leftText}</div>
            </div>
            <div
                className={disable("modal-button-right")}
                onClick={()=>{
                    onOK()
                }}
            >
                <img
                    className={disable("modal-button-right-image")}
                    src="//s.lianmeihu.com/x-uploader/image/2022-03-17/96c7995f1164caa7cc48c21341391d65"
                />
                <div className="modal-button-right-button">{rightText}</div>
            </div>
        </div>
    )
}

export default ModalButton