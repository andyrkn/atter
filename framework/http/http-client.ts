import { HttpResponse } from "./http-response";

export class HttpClient {

    public get(req, callback, error) {
        this.request(req, 'get', null, null, callback, error);
    }

    public post(req, body, callback, error) {
        this.request(req, 'post', body, null, callback, error);
    }

    public put(req, body, callback, error) {
        this.request(req, 'put', body, null, callback, error);
    }

    public patch(req, body, callback, error) {
        this.request(req, 'patch', body, null, callback, error);
    }

    public delete(req, body, callback, error) {
        this.request(req, 'delete', body, null, callback, error);
    }

    public options(req, body, callback, error) {
        this.request(req, 'options', body, null, callback, error);
    }

    public request(req, requestVerb, body, headers, callback, error) {
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status >= 400) {
                    if (error) {
                        error(new HttpResponse(xmlHttp));
                    }
                } else {

                    if (callback) {
                        callback(new HttpResponse(xmlHttp));
                    }
                }
            }
        };

        xmlHttp.onerror = () => {
            if (error) {
                error(new HttpResponse(xmlHttp));
            }
        };

        xmlHttp.open(requestVerb, req, true);

        // TODO: introduce interceptor
        // TODO: use fetch api maybe
        const token = localStorage.getItem('userToken');
        if (token) {
            xmlHttp.setRequestHeader('authorization', token);
        }
        xmlHttp.send(body);
    }
}