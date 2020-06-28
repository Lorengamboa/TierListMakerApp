export function checkUrlImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}