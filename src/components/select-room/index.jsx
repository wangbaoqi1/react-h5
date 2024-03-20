import React, { useEffect, useState } from 'react';
import { Button, Cascader } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';

import api from '../../api';

export default ({ projId, visible, setVisible, onChange }) => {
    const [options, setOptions]= useState([]);
    const [loading, setLoading]= useState(false);

    useEffect(()=>{
        if(!projId) return;
        api.getBuildingList(projId).then((list)=>{
            const buildingList = list.map((item) => {
                return {
                    label: item.name + '幢',
                    unitCount: item.unitCount,
                    value: item.id,
                    key: item.id,
                    children: Array(item.unitCount).fill(0).map((_, uindex) => {
                        return {
                            label: (uindex + 1) + '单元',
                            value: uindex + 1,
                            children: []
                        }
                    })
                }
            })
            setOptions(buildingList);
        });
    }, [projId])

    const onSelect = (values = [], valueExtend) => {
        if(values.length === 2) {
            // 选中单元
            const [buildingId, unit] = values;
            setLoading(true);
            api.getRoomList(buildingId).then((list)=>{
                console.log('--room list', list);
                const roomList = list.filter(item => item.unit == unit).map(item=>({
                    label: item.name,
                    value: item.id,
                }))
                const optionsCopy = [...options];
                const bildingItem = optionsCopy.find(item => item.value === buildingId);
                const unitItem = bildingItem.children.find(item => item.value === unit);
                unitItem.children = roomList;
                setOptions(optionsCopy);
            }).finally(()=>{
                setLoading(false);
            })
        }
    }

    return (
        <>
        <Cascader
            title={'选择房间'}
            loading={loading}
            options={options}
            visible={visible}
            onSelect={onSelect}
            onConfirm={(values, valueExtend)=>{
                onChange(values, valueExtend);
                setVisible(false);
            }}
            onClose={() => {
                setVisible(false);
            }}
        />
        </>
    )
}