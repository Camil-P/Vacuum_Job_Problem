const fs = require('fs');
const InputSampleFile = 'test.in';
const outputFile = '../output.txt';

const data = [[]];

readInputData(InputSampleFile).then(d => {
    let arr = [];
    arr = d.split(/\r?\n/);
    arr.forEach((v, i, a) => {
        data[i] = v.split(/\s/).map(a => parseInt(a));
    });
    const res = printRes(data);
    fs.writeFileSync(outputFile, res, 'utf-8');
});

function printRes(data){
    let result = '';
    data.forEach((val, ind, arr) => {
        let check = false;
        val.forEach((v, i, a) => {
            let prev = a[i - 1];
            let next = a[i + 1];
            if(v === 0 || checkSum(prev, v, next)){
                check = true;
            }
        });
        result += check ? 'yes\n' : 'no\n';
    });
    return result;
}

function checkSum(prevValue = 0, currValue, nextValue = 0){
    return (prevValue + currValue + nextValue) === 0 ? true : false;
}

async function readInputData(fName){
    const data = await fs.promises.readFile(InputSampleFile, 'utf-8');
    return data;
}