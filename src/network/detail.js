import { request } from './request';

async function getRecommend() {
    let response = await request({
        url: 'recommend',
    })
    return response;
}

async function getDetail(iid) {
    let response = await request({
        url: 'detail',
        params: { iid }
    })
    return response;
}

class GetDetailInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

class GetShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
class GetParamsInfo {
    constructor({ info, rule }) {
        this.tables = rule.tables;
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = this.rules();
    }
    rules() {
        // 判断是否有多个array
        if (this.tables.length > 1) {
            return this.tables[0].map((val, index) => {
                let size = this.tables[1][index].slice(1).join('');
                val.push(size);
                return val;
            });
        } else {
            return this.tables[0];
        }
    }
}
export { getDetail, getRecommend, GetDetailInfo, GetShopInfo, GetParamsInfo }