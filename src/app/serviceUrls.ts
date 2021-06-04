import { environment } from '../environments/environment.prod';

export class urlServices {
    // getCall = `${environment.serviceUrl}/posts`;
    getCall = `https://api.github.com/search/users`;
    getCallById = `https://api.github.com/users/`;
}