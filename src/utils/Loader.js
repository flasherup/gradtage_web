export default class Loader {
    constructor(endpoint, key) {
        this.endPoint = endpoint;
        this.key = key;
    }

    loadDegree(data, success, error) {
        const url = this.endPoint + "/temperature";
        const request = new XMLHttpRequest;
        request.open("POST", url)
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onload = function (event) {
            if (200 === request.status) {
                success(request.responseText);
            } else {
                error(request.statusText);
            }
        }, request.onError = error, request.send(JSON.stringify({
            key: this.key,
            station: data.station,
            start: data.start,
            end: data.end,
            tb: data.hdd,
            tr: data.dd,
            output: data.output
        }))
    }
}