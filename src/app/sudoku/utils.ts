/**
 * 生成n个数字，范围再min到max之间
 * @param n 生成的数量
 * @param min 最小值
 * @param max 最大值
 * @returns Array(n)
 */
function getRandomArray(n, min, max) {
    var arr = [];
    for (var i = min; i <= max; i++) {
        arr.push(i);
    }

    var result = [];
    for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * arr.length);
        var num = arr[index];
        arr.splice(index, 1);
        result.push(num);
    }

    return result;
}

export function init() {
    const initData = Array(9).fill(0).map(item => Array(9).fill(0));
    const randowTowNum = getRandomArray(2, 1, 9);
    initData[0][0] = randowTowNum[0];
    initData[0][1] = randowTowNum[1];
    if (fillCell(initData, 0, 2)) {
        return initData;
    }
}

function fillCell(initData, row, col) {
    if (row === 9) {
        return true; // 已经填完最后一行，说明成功填充完整个数独棋盘
    }

    if (col === 9) {
        return fillCell(initData, row + 1, 0); // 当前行填完，转到下一行的第一个格子
    }

    if (initData[row][col] !== 0) {
        return fillCell(initData, row, col + 1); // 当前格子已经有数字，跳过
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(initData, row, col, num)) {
            initData[row][col] = num; // 尝试填入数字
            if (fillCell(initData, row, col + 1)) {
                return true; // 填入成功，继续填下一个格子
            }
            initData[row][col] = 0; // 回溯
        }
    }

    return false; // 无法找到合适的数字，回溯到上一个格子
}

function isValid(initData, row, col, num) {
    // 检查同一行是否有重复数字
    for (let i = 0; i < 9; i++) {
        if (initData[row][i] === num) {
            return false;
        }
    }

    // 检查同一列是否有重复数字
    for (let i = 0; i < 9; i++) {
        if (initData[i][col] === num) {
            return false;
        }
    }

    // 检查所在的 3x3 方格是否有重复数字
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (initData[i][j] === num) {
                return false;
            }
        }
    }

    return true; // 当前数字满足数独规则
}