import React, { useEffect, useState, useRef } from 'react';
import { Button, SearchBar, Popup, AutoCenter, Loading, List } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { useRequest } from 'ahooks';

import api from '../../api';

export default ({ visible, setVisible, onChange }) => {
    const containerRef = useRef(null);
    const [name, setName] = useState('');

    const {data, run, loadMore, loadingMore, reload, noMore, loading} = useRequest(
        (result) => {
            let page = result !== undefined ? result.page + 1 : 0;
            return api.getProjList({
                page,
                searchKey: name,
            }).then(res => {
                res.page = page;
                return res;
            });
        },
        {
            debounceInterval: 500,
            loadMore: true,
            ref: containerRef,
            isNoMore: (d) => {
                const {list, total} = d;
                return list.length >= total;
            },
            refreshDeps: [name],
        },
    );

    useEffect(()=>{
        if(visible) {
            setName('');
        }
    }, [visible])

    const { list } = data;

    return (
      <Popup
            forceRender
            closeOnMaskClick
            bodyStyle={{ padding:20, height: '50vh' }}
            visible={visible} 
            onClose={() => setVisible(false)}
        >
            <SearchBar placeholder='搜索'
                onChange={val => {
                    setName(val);
                }}
            />
            <div ref={containerRef} style={{ height: 'calc(50vh - 70px)', overflowY: 'auto' }}>
                <List>
                    {list.map((item) => (
                        <List.Item key={item.id} arrow={false} onClick={()=>{
                            setVisible(false);
                            onChange(item.id, item);
                        }}>{item.name}</List.Item>
                    ))}
                </List>
                <AutoCenter style={{marginTop: 15}}>
                    {!noMore && loadingMore && <Loading />}
                    {noMore && <span>加载完成</span>}
                </AutoCenter>
            </div>
        </Popup>
    )
}