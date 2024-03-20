import ModalButton from '../modal-button'
import './index.less'

const ModalConfirm = ({
	visible = false,
	onCancel=()=>{},
	onOk=()=>{},
	title,
    children
}) => {
	if (!visible) {
		return <></>
	}
	return (
		<div className="modal-confirm">
			<div className="modalLayer">
				<div className="modal">
					<div className="modal-title">{title}</div>
                    {children}
                    <ModalButton onCancel={()=>onCancel()} onOK={()=>onOk()} disabled={false}/>
				</div>
			</div>
		</div>
	)
}

export default ModalConfirm