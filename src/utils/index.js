export function cleanParams(datas) {
    var v_data = {};
    for (var a in datas) {
        if (datas[a] != null && datas[a] instanceof Array) {
            v_data[a] = [];
        } else {
            v_data[a] = null;
        }
    }
    return v_data;
}

export function group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
  }