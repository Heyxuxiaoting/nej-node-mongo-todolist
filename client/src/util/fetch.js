import { message } from 'antd';
const Fetch = function(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options).then(res => {
            if(res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    res.status);
                reject(res.status);
            }
            resolve(res.json());
        }).catch(err => {
            console.log('Fetch Error :-S', err);
            message.error(err.toString() || 'Fetch Error :-S');
        });
    }).then(res => {
        if(res.code !== 200) {
            message.error(res.message || 'API Error :-S');
            throw new Error(res.code);
        }
        return res;
    }, status => {
        console.log('Fetch Error :-S', status);
        message.error(status || 'Fetch Error :-S');
    });
};
export default Fetch;
