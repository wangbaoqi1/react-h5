import mwp, { MWPFilter } from "@/common/mwp";

export default {
    getBillManagerList: ({
        projId,
        buildingId,
        roomId,
        entityType, // 1-房屋 2-车位
        parkPositionId,
    }) => {
        return mwp.request('finance.bill-manager.list', '1', {
                page: 0,
                size: 100,
                projId,
                buildingId,
                roomId,
                entityType,
                parkPositionId,
            })
            .then(MWPFilter)
            .then(({list = [], total = 1}) => {
                return list || [];
            })
    },
    getBillListForCashier: ({
        page,
        billStatus,
        projId,
        entityType,
        entityId,
    }) => {
        return mwp.request('finance.bill.list-for-cashier', '1', {
                page,
                size: 200,
                billStatus,
                projId,
                entityType,
                entityId,
            })
            .then(MWPFilter)
            .then(res=>{
                res.list.forEach(item => item.payAmt = item.billAmt - item.deductionAmt);
                return res;
            })
    },
    getPayUrl: ({ projId, billIds, payMethods }) => {
        return mwp.request('finance.pay.bill.backstage', '1', {
                projId,
                billIds,
                payMethods, // 1-微信 2-支付宝
            })
            .then(MWPFilter)
    },
    getPayResult: (orderNo) => {
        return mwp.request('finance.pay.bill.result', '1', {
                orderNo
        }).then(MWPFilter)
    }
}