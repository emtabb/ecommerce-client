function parseQuery(search) {

    var args = search.substring(1).split('&');
    var argsParsed = {};
    var i, arg, kvp, key, value;
    for (i=0; i < args.length; i++) {
        arg = args[i];
        if (-1 === arg.indexOf('=')) {
            argsParsed[decodeURIComponent(arg).trim()] = true;
        }
        else {
            kvp = arg.split('=');
            key = decodeURIComponent(kvp[0]).trim();
            value = decodeURIComponent(kvp[1]).trim();
            argsParsed[key] = value;
        }
    }

    return argsParsed;
}

function beautyNumber(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 === 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 === 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 === 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 === 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 === 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 === 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}

function isNull(something) {
    return something === null || something === undefined;
}

function isString(someString) {
    return typeof someString === typeof "";
}

function isContainsID(object) {
    return Object.keys(object).find(key => key === "_id") !== undefined;
}

function isUndefined(something) {
    return something === undefined;
}

function isEmpty(arrays = []) {
    return arrays.length === 0;
}

function isBlank(key) {
    return !notNull(key);
}

function notNull(key) {
    return key !== undefined  && key !== "" && key !== null;
}

function notEmpty(key) {
    return key !== "" && key !== undefined
}

function emptyObject(key) {
    if (notNull(key)) {
        return Object.keys(key).length === 0
    } else {
        return true;
    }
}

function notEmptyObject(key) {
    return !emptyObject(key);
}

function mapSchema(data, Schema) {
    let objectData = new Schema();
    let keys = Object.keys(objectData);
    for (const key of keys) {
        if (notNull(data[key])) {
            objectData[key] = data[key];
        } else {
            objectData[key] = null;
        }
    }
    return objectData;
}

const camelToSnakeCase = str =>
    str
        .replace(str.charAt(0), letter => letter.toLowerCase())
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export default {
    isNull      : isNull,
    notNull     : notNull,
    isBlank     : isBlank,
    notEmpty    : notEmpty,
    isUndefined : isUndefined,
    isEmpty     : isEmpty,
    emptyObject : emptyObject,
    notEmptyObject : notEmptyObject,
    isContainsID: isContainsID,
    isString    : isString,
    mapSchema : mapSchema,
    beautyNumber : beautyNumber,
    camelToSnakeCase : camelToSnakeCase,
    parseQuery : parseQuery
}
