import { HttpResponse } from "./http-response";

export class HttpClient {

    public get(req, callback, error, token) {
        this.request(req, 'get', null, null, callback, error, token);
    }

    public post(req, body, callback, error, token) {
        this.request(req, 'post', body, null, callback, error, token);
    }

    public put(req, body, callback, error, token) {
        this.request(req, 'put', body, null, callback, error, token);
    }

    public patch(req, body, callback, error, token) {
        this.request(req, 'patch', body, null, callback, error, token);
    }

    public delete(req, body, callback, error, token) {
        this.request(req, 'delete', body, null, callback, error, token);
    }

    public options(req, body, callback, error, token) {
        this.request(req, 'options', body, null, callback, error, token);
    }

    public request(req, requestVerb, body, headers, callback, error, token) {
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
        if (token) {
            xmlHttp.setRequestHeader('Authorization', this.getEncodedAuth(token));
        }
        xmlHttp.send(body);
    }
    private getEncodedAuth(token): string {
        return ("Basic " + new Buffer(token.username + ":" + token.password).toString("base64"));
    }
}