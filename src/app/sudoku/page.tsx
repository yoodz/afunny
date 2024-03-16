import SudokuComponent from '@/components/sudoku';
import { init } from './utils';
import s from './page.module.css';

export default function Sudoku() {
    const initData = init();
    const fakeData = JSON.parse(JSON.stringify(initData))

    function initFakeData() {
        for (let i = 0; i < fakeData.length; i++) {
            const element = fakeData[i];
            const emptyIndex = Array(5).fill(0).map(item => Math.floor(Math.random() * 9))

            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                if (emptyIndex.includes(j)) {
                    fakeData[i][j] = 0;
                }
            }
        }
    }

    initFakeData()
    return (
        <div className={s.wrap}>
            <SudokuComponent fakeData={fakeData} initData={initData} />
        </div>
    );
}