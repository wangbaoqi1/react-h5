// 给数字后面加单位
export const addUnit = (name, unit) => {
	if (!name) {
		return ''
	}
	if (!isNaN(name)) {
		return name + unit
	}
	return name
}
// 楼栋名称
export const getBuildingName = (buildingName = '') => {
	return addUnit(buildingName, '幢')
}

// 获取房间名称的方法
export const getRoomName = ({ buildingName = '', roomInfo = {} }) => {
	const { name: roomName, unit, level } = roomInfo
	const name = [
		addUnit(buildingName, '幢'),
		addUnit(unit, '单元'),
		addUnit(level, '层'),
		addUnit(roomName, '室'),
	].join('')
	return name
}

export const getRoom = ({ buildingName = '', unit, roomName }) => {
	const name = [
		addUnit(buildingName, '幢'),
		addUnit(unit, '单元'),
		addUnit(roomName, '室'),
	].join('')
	return name
}

export const formatBuildingName = (buildingName = '') => {
	const isBuildingNamePureNumber = /^\d+$/g.test(buildingName)
	return buildingName + (isBuildingNamePureNumber ? '幢' : '')
}

export const formatRoomFullInfo = (
	buildingName = '',
	unit = 0,
	level = 0,
	roomName = ''
) => {
	const name = [
		addUnit(buildingName, '幢'),
		addUnit(unit, '单元'),
		addUnit(level, '层'),
		addUnit(roomName, '室'),
	].join('-')
	return name
}

export const formatMoney = (number = 0) => {
	return (number / 100).toFixed(2)
}