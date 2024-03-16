'use client';
import { message } from 'antd';

import s from "./index.module.css";

import { Popover } from 'antd';

export default function SudokuInput({ setFakeData, fakeData, i, j, initData }) {
    const [messageApi, contextHolder] = message.useMessage();

    function isSuccess(data) {
        let flag = true;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                if (element2 === 0) {
                    flag = false;
                }
            }
        }
        return flag;
    }
    function handleClick(num: string) {
        console.log(num, initData[i][j], 'index-25')
        if (num === initData[i][j]) {
            fakeData[i][j] = num;
            setFakeData(fakeData);
            console.log(fakeData, 'index-28')

            if (isSuccess(fakeData)) {
                message.success('恭喜你完成了！');
            }
        } else {
            message.error('出错了!');
        }
    }
    const content = (
        <div className={s.wrap}>
            {
                Array(9).fill(0).map((item, key) => {
                    return <p className={s.item} key={key} onClick={() => handleClick(key + 1)}>{key + 1}</p>
                })
            }
        </div>
    );

    return <Popover content={content} trigger="click">
        <div style={{ width: '100%', height: '100%' }} />
    </Popover>
}