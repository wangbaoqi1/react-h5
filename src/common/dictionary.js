// 对接口 dict.listType 中包含的类型做一个映射，接口仅返回了类型
// 的数字值，前端通过可读命名来操作。有对不上的，可以找一下 @喜助
import mwp, { MWPFilter } from './mwp'

const paymentChannelType = 1 // 支付渠道类型
const contactType = 2 // 联系方式
const certificateType = 3 // 证件类型
const employeeRoleType = 4 // 员工角色类型
const decorationType = 5 // 项目交付时候装修类型：精装、毛坯 等
const areaType = 6 // 组织结构的区域信息
const userRoleType = 7 // 用户角色类型
const buildingType = 8 // 楼栋类型
const roomType = 9 // 房屋类型
const roomSaleStatusType = 10 // 房屋销售状态类型
const roomUsageStatusType = 11 // 房屋使用状态类型
const departmentType = 12 // 部门类型
const bankType = 14 // 银行类型
const ticketType = 15 // 票据类型
const roomAttributeType = 16 // 房间属性（应该是废弃的属性）
const roomLivingStatusType = 17 // 房屋居住状态
const roomPropertyType = 18 // 房屋产权类型
const roomDeliveryStatusType = 19 // 房屋交付进度类型
const parkingPropertyType = 20 // 车位属性 - 人防车位、赠送业位、销售车位 等
const parkingType = 21 // 停车方式 - 固定、非固定
const workOrderType = 23 // 工单类型
const thirdPartyType = 24 // 第三方工单处理方
const forwardWorkflowType = 25 // 转发工单原因

function filterData(targetList = [], types = []) {
	// 为 result 建立 filter 指定的各个字段，主动为判空做容错
	const result = types.reduce((acc, type) => {
		acc[type] = []
		return acc
	}, {})

	// 对 targetList 判空处理，可能传入的是 null
	if (!Array.isArray(targetList)) return result

	return targetList.reduce(
		(
			acc,
			{ id, name, type, value, typeName, disabled = false, parent }
		) => {
			const data = { id, name, type, value, typeName, disabled, parent }
			const list = acc[type]

			if (list) acc[type] = [...list, data] // 只存用户指定的 type 对应的数据

			return acc
		},
		result
	)
}

async function getDictionary(typeFilters = [], ignoreAuth = false, projId) {
	// const projInfo = global.projInfo;
	const param = {
		projId: projId,
		ignoreAuth,
		typeFilters,
		hideDisable: true,
		page: 0,
		size: 1000000,
	}

	return mwp
		.request('dict.list', '1', param)
		.then(MWPFilter)
		.then(({ list }) => filterData(list, typeFilters))
}

const buildDictionaryOptions = (options = []) => {
	if (options === null) return []
	return options.map(({ id, name }) => ({ label: name, value: id }))
}

const transformAntdOptionsFilter = (data) => {
	const keys = Object.keys(data)
	return keys.reduce((acc, key) => {
		acc[key] = buildDictionaryOptions(data[key])
		return acc
	}, {})
}

export default getDictionary
export { buildDictionaryOptions, transformAntdOptionsFilter }

export const dictTypes = {
	paymentChannelType,
	buildingType,
	roomType,
	roomSaleStatusType,
	decorationType,
	roomUsageStatusType,
	areaType,
	userRoleType,
	contactType,
	departmentType,
	certificateType,
	employeeRoleType,
	bankType,
	ticketType,
	roomAttributeType,
	roomLivingStatusType,
	parkingPropertyType,
	parkingType,
	roomDeliveryStatusType,
	roomPropertyType,
	workOrderType,
	thirdPartyType,
	forwardWorkflowType,
}
