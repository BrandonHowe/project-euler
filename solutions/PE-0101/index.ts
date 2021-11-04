import { time } from "../common";

type Polynomial = number[];

const showPoly = (p: Polynomial) => {
    if (p.length === 1 && p[0] === 0) {
        return "0";
    }
    
    let res = "";
    let hit = false;

    for (let i = p.length - 1; i >= 0; i--) {
        const val = p[i];
        if (val !== 0) {
            res += `${val > 0 ? hit === true ? " + " : "" : " - "}${val !== 1 ? Math.abs(val) : ""}${i !== 0 ? "x" : ""}${i > 1 ? "^" : ""}${i >= 2 ? i : ""}`;
            hit = true;
        }
    }

    return res;
}

const getPolyValue = (a: Polynomial, val: number) => {
    if (val < 0 || val >= a.length) {
        return 0;
    } else {
        return a[val];
    }
}

const addPolynomials = (p: Polynomial, q: Polynomial) => {
    const res: Polynomial = Array(p.length > q.length ? p.length : q.length).map(() => 0);

    for (let i = 0; i < res.length; i++) {
        res[i] = getPolyValue(p, i) + getPolyValue(q, i);
    }

    return res;
}

const multiplyPolynomials = (p: Polynomial, q: Polynomial) => {
    const res: Polynomial = [];

    const l = p.length + q.length;

    for (let i = 0; i < l; i++) {
        let s: number = 0;

        for (let j = 0; j <= i; j++) {
            // console.log(i, j, getPolyValue(p, j), getPolyValue(q, i - j))
            s += (getPolyValue(p, j) * getPolyValue(q, i - j));
        }

        res.push(s);
    }

    return res;
};

const evaluatePolynomial = (p: Polynomial, x: number) => {
    let res = 0;

    for (let i = 0; i < p.length; i++) {
        res += p[i] * (x ** i);
    }

    return res;
}

const dividedDifference = (points: number[][]): number => {
    const x = points.map(l => l[0]);
    const y = points.map(l => l[1]);
    // console.log("DD:", points, points.length);

    if (points.length === 1) {
        return y[0];
    }

    if (points.length === 2) {
        return (y[1] - y[0]) / (x[1] - x[0]);
    }    

    const f1 = dividedDifference(points.slice(1, points.length));
    const f2 = dividedDifference(points.slice(0, points.length - 1));

    // console.log(`F1: ${f1}, F2: ${f2}`);

    return (f1 - f2) / (x[points.length - 1] - x[0]);
}

const polynomial = (n: number) => 1 - n + (n ** 2) - (n ** 3) + (n ** 4) - (n ** 5) + (n ** 6) - (n ** 7) + (n ** 8) - (n ** 9) + (n ** 10);
// const polynomial = (n: number) => n ** 3;

const OP = (k: number, n: number) => {
    const values = Array(k).fill(0).map((_, idx) => polynomial(idx + 1));
    const points = values.map((l, idx) => [idx + 1, l]);

    const e = (j: number, x: Polynomial) => {
        if (j === 0) return [1];

        let res: Polynomial = [-getPolyValue(x, 0), 1];

        for (let i = 1; i < j; i++) {
            // console.log(res, [-getPolyValue(x, i), 1]);
            res = multiplyPolynomials(res, [-getPolyValue(x, i), 1]);
        }

        return res;
    }

    const N = () => {
        let res: Polynomial = [];

        for (let i = 0; i < points.length; i++) {
            // console.log("Points: ", points.slice(0, i + 1));
            const dd = dividedDifference(points.slice(0, i + 1));
            const nb = e(i, points.map(l => l[0]));

            // console.log("Status: ", res, "|", showPoly(nb), "|", dd, "|", points[i][1], "|", showPoly(multiplyPolynomials([dd], nb)));
            res = addPolynomials(res, multiplyPolynomials([dd], nb));
        }
        
        // console.log(showPoly(res));

        return res;
    }

    const poly = N();

    return evaluatePolynomial(poly, n);
    // return e(points.length, points.map(l => l[0]));
};

time(() => {
    let sum = 0;
    for (let i = 1; i < 11; i++) {
        sum += OP(i, i + 1);
    }
    console.log(sum);
    return sum;
});