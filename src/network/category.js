import { request } from './request';
async function getCategoryMenu() {
    return await request({ url: 'category' })
}

async function getSubcategory(maitKey) {
    return await request({
        url: 'subcategory',
        params: {
            maitKey
        }
    })
}

async function getCategoryDetail(miniWallkey, type) {
    return await request({
        url: 'subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}
export { getCategoryMenu, getSubcategory, getCategoryDetail }