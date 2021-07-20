import { request } from './request';

async function getDetail(iid) {
    let response = await request({
        url: 'detail',
        params: { iid }
    })
    return response;
}
export { getDetail }