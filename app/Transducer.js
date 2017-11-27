const doubleTheNumber = number => number * 2;
[1,2,3,4].map(doubleTheNumber);

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number));
[1,2,3,4].map(doubleTwice);

const evenOnly = number =>  umber % 2 === 0;
const doubleAndEven = number => doubleTheNumber(evenOnly(number));
[1,2,3].filter(doubleAndEven);

// DECORATORS:

// const map = (xf) => {
//     return (accumulation, value) => {
//         accumulation.push(xf(value));
//         return accumulation;
//     };
// };

// const filter = (predicate) => {
//     return (accumulation, value) => {
//         if (predicate(value)) {
//             return accumulation.push(value);
//         }
//         return accumulation;
//     };
// };

// TRANSDUCER No. 1:
const filter = predicate => reducer => {
    return (accumulation, value) => {
        if (predicate(value)) {
            return reducer(accumulation, value);
        }
        return accumulation;
    };
};
// TRANSDUCER No. 2:
const map = xf => reducer => {
    return (accumulation, value) => {
        reducer(accumulation, xf(value));
        return accumulation;
    };
};

[1,2,3,4].reduce(filter(evenOnly)(map(doubleTheNumber)), []);// [1,2,3,4] => [4,8]

const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const doubleMap = map(doubleTheNumber);
const pushReducer = (accumulation, value) => {
    accumulation.pus(value);
    return accumulation;
};


[1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []);

const compose = (...functions) =>
    functions.reduce((accumulation, fn) =>
        (...args) => fn(accumulation(...args)), x => x);

const cleanNumbersXf = compose(isNot2Filter, isEvenFilter, doubleMap);
[1,2,3,4].reduce(cleanNumbersXf(pushReducer), []);

//--------------
const transduce = (xf, reducer, seed, collection) => {
    // collection.reduce(xf(reducer), seed);
    const transformedReducer = xf(reducer);
    let accumulation = seed;
    for (const value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }
    return accumulation;
};

transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    [1,2,3,4],
);

const numMap = new Map();
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);
transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    numMap.values(),
);

const toUpper = str => str.toUpperCase();
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());
transduce(
    compose(map(toUpper), filter(isVowel)),
    (str, char) => str + char,
    '',
    'piotr',
);































