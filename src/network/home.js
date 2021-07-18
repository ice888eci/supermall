import { request } from './request';
const GetMultidata = async function () {
    let req = await request({ url: '/home/multidata' })
    return req
}

const GetGoodsData = async function (params) {
    let req = await request({ params, url: "home/data", })
    return req
}
export { GetMultidata, GetGoodsData }