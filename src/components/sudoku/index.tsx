'use client';
import { useEffect, useRef, useState } from "react";
import cls from 'classnames';
import dayjs from 'dayjs';

import SudokuInput from '@/components/sudokuInput';
import s from "./index.module.css";

interface ISudoInput {
    fakeData: [];
    initData: any;
}

export default function SudoInput({ fakeData, initData }: ISudoInput) {
    const [_fakeData, setFakeData] = useState(fakeData || []);
    const timer: any = useRef();
    const [num, setNum] = useState(0);

    const increaseNum = () => setNum((prev) => prev + 1);

    useEffect(() => {
        timer.current = setInterval(increaseNum, 1000); 

        return () => clearInterval(timer.current);
    }, [])

    return <div>
        <div className={s.timer}>用时：{dayjs(num * 1000).format('mm:ss')}</div>
        {
            fakeData.map((item, index) => {
                return <div className={s.row} key={index}>
                    {item || [].map((item2, index2) => {
                        return <div className={cls(s.item,
                            {
                                [s.borderBottom]: [2, 5].includes(index),
                                [s.borderRight]: [2, 5].includes(index2)
                            })
                        } key={index2}>
                            {item2 ? <span>{item2}</span> : <SudokuInput initData={initData} fakeData={_fakeData} setFakeData={setFakeData} i={index} j={index2} />}
                        </div>
                    })}
                </div>
            })
        }
    </div>
}