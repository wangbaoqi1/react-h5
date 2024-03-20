import mwp, { MWPFilter } from "@/common/mwp";

import bill from './bill';

export default {
    ...bill,
    getProjList: ({ page, searchKey }={}) => {
        return mwp
          .request('org.proj.listForPublic', '1', {
            size: 200,
            searchKey,
            page,
          })
          .then(MWPFilter);
    },
    getBuildingList: (projId) => {
        return mwp.request('building.list', '1', {
                page: 0,
                size: 100,
                projId,
            })
            .then(MWPFilter)
            .then(({list = [], total = 1}) => {
                return list || [];
            })
    },
    getRoomList: (buildingId) => {
        return mwp.request('room.list', '1', {
            page: 0, size: 1000, buildingId,
        })
        .then(MWPFilter)
        .then(({list = [], total = 1}) => {
            return list || [];
        })
    },
    getRoomDetail: (roomId) => {
        return mwp.request('room.detail', '1', {
            id: roomId,
        })
        .then(MWPFilter)
    },
    getParkPositionList: ({ projId, name, page }) => {
        return mwp
        .request("parkPosition.list", "1", { projId: projId, page, size: 50, name })
        .then(MWPFilter)
    }
}