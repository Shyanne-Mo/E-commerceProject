const key = 'goods';

// 获取到本地的数据 对象格式
export const getLocalInfo = () => {
    const goodsInfo = JSON.parse(localStorage.getItem(key) || '{}');
    return goodsInfo;
}

// 获取购物车商品总数的方法
export const getTotalCount = () => {
    let goodsInfo = getLocalInfo();
    let totalCount = 0;
    for (const key in goodsInfo) {
        // 把数量全部拿到
        totalCount += goodsInfo[key];
    }
    return totalCount;
}

// 添加数据到本地
export const addLocalInfo = (obj) => {
    // 拿到localstorage中的对象
    // 存储的格式 {"87":3,"94":2}
    // 传过来的对象格式 {goodsId:'87',count:'2'}
    let goodsInfo = getLocalInfo();
    // 判断添加的这个值是否存在
    if (goodsInfo[obj.goodsId]) {
        // 存在的话 在原来的基础上做加法
        goodsInfo[obj.goodsId] += obj.count;
    } else {
        // 不存在的话 直接给商品id对应的属性添加一个值
        goodsInfo[obj.goodsId] = obj.count;
        // 添加之后的格式可能为{"87":3,"94":2,"98":1}
        // localStorage.setItem(key, JSON.stringify(goodsInfo));
        // 把新的值重新设置之后调用商品总数的方法
        // return getTotalCount();
    }
    localStorage.setItem(key, JSON.stringify(goodsInfo));
    return getTotalCount();
}


// 修改本地的数据
export const updateLocalInfo = (obj) => {
    let goodsInfo = getLocalInfo();
    for (let key in goodsInfo) {
        if (key == obj.goodsId) {
            goodsInfo[key] = obj.choosenumber;
        }
    }
    localStorage.setItem(key, JSON.stringify(goodsInfo));
    return getTotalCount();
}

export const deleteLocalInfo = (goodsId) => {
    let goodsInfo = getLocalInfo();
    delete goodsInfo[goodsId];
    localStorage.setItem(key, JSON.stringify(goodsInfo));
    return getTotalCount();
}

export const updateLocalIds = (obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
    return getTotalCount();
}