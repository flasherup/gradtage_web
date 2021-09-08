export const copyAllFields = (res, src) => {
    if(!res || !src) return;
    for (let key in src) {
        res[key] = src[key];
    }
}