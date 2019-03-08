'use strict'
const _ = require("lodash");

const arr = [];
for (let i = 0; i < 12; i++) {
    arr.push({
        id: i,
        val: 1
    });
}


for (let i = 0; i< 12; i++) {
    const a = _.cloneDeep(arr);
    a[i].val = 2;
    startCheck(..._.chunk(a,4));

}
console.log("\n=====================\n");

for (let i = 0; i < 12; i++) {
    const a = _.cloneDeep(arr);
    a[i].val = 0;
    startCheck(..._.chunk(a, 4));

}

function startCheck(first, second, third) {
    const store = {
        attempts: 0
    };
    const weight = compare.bind(store);
    const out = report.bind(store);
    const diff1 = weight(first, second);
    if (!diff1) {
        const extra = third.slice(0, 3);
        let diff = weight(extra, first.slice(0, 3));
        if (!diff) {
            diff = weight([third[3]], first[0]);
            out(third[3], diff);
        } else {
            let diff2 = weight(extra[0], extra[1]);
            if (!diff2) {
                out(extra[2], diff);
            } else {
                if (diff2 === diff) {
                    out(extra[0], diff2);
                } else {
                    out(extra[1], -diff2);
                }
            }
        }
    } else {
        const copy1 = first.slice(0);
        const copy2 = second.slice(0);
        copy1[0] = second[0];
        copy2[0] = first[0];
        const extra = copy1.slice(1, 4);
        const extra1 = copy2.slice(1, 4);
        copy1[1] = third[1];
        copy1[2] = third[2];
        copy1[3] = third[3];
        let diff2 = weight(copy1, copy2);
        if (!diff2) {
            let diff3 = weight(extra[0], extra[1]);
            if (!diff3) {
                out(extra[2], diff1);
            } else {
                if (diff1 > 0 ? diff3 > 0 : diff3 < 0) {
                    out(extra[0], diff1);
                } else {
                    out(extra[1], diff1);
                }
            }
        } else {
            if (diff1 !== diff2) {
                const diff3 = weight(copy1[0], third[0]);
                if(!diff3) {
                    out(copy2[0], diff1)
                } else {
                    out(copy1[0], diff3)
                }
            } else {
                const diff3 = weight(extra1[0], extra1[1]);
                if (!diff3) {
                    out(extra1[2], -diff1);
                } else {
                    if (diff1 < 0 ? diff3 > 0 : diff3 < 0) {
                        out(extra1[0], -diff1);
                    } else {
                        out(extra1[1], -diff1);
                    }
                }
            }
        }
    }
}

function compare(left, right) {
    const sum = (arr) => (Array.isArray(arr) ? arr : [arr]).reduce((acc, val) => {
        return acc + val.val
    }, 0);
    this.attempts++;
    return sum(left) - sum(right);
}

function report(ball, diff) {
    const isHeavier = (val) => val > 0 ? "heavier" : "lighter";
    console.log(`id=${ball.id} val=${ball.val} it is ${isHeavier(diff)}, attempts used ${this.attempts}`);
}