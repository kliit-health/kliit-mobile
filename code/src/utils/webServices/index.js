/* eslint-disable no-console */
import Axios from 'axios';
import Constant from '../constants';

export function getApiHit(url, header) {
  try {
    console.log('\n\n--------------***** Api Hit Start *********-----------');
    console.log('url', `${Constant.App.Api.BaseUrl}${url}`);
    console.log('header', header);
    return Axios.get(`${Constant.App.Api.BaseUrl}${url}`, { headers: header })
      .then((response) => {
        console.log('response', response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return response.data;
      })
      .catch((error) => {
        console.log('error', error.response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return error.response.data;
      });
  } catch (error) {
    return false;
  }
}

export function getLocationDetail(url, header) {
  try {
    console.log('\n\n--------------***** Api Hit Start *********-----------');
    console.log('url', url);
    console.log('header', header);
    return Axios.get(url, { headers: header })
      .then((response) => {
        console.log('response', response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return response;
      })
      .catch((error) => {
        console.log('error', error);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return error;
      });
  } catch (error) {
    return false;
  }
}

export function postApiHit(url, header, data) {
  try {
    console.log('\n\n--------------***** Api Hit Start *********-----------');
    console.log('url', `${Constant.App.Api.BaseUrl}${url}`);
    console.log('header', header);
    console.log('data', data);
    return Axios.post(`${Constant.App.Api.BaseUrl}${url}`, data, {
      headers: header,
    })
      .then((response) => {
        console.log('response', response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return response.data;
      })
      .catch((error) => {
        console.log('error', error.response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return error.response.data;
      });
  } catch (error) {
    console.log('error crash', error);
    return false;
  }
}

let cancel;
const { CancelToken } = Axios;
export function getApiAsyncHit(url, header) {
  try {
    console.log('\n\n--------------***** Api Hit Start *********-----------');
    console.log('url', `${Constant.App.Api.BaseUrl}${url}`);
    console.log('header', header);
    console.log('cancel', cancel);
    if (cancel) {
      cancel();
    }
    return Axios.get(
      `${Constant.App.Api.BaseUrl}${url}`,
      {
        headers: header,
        cancelToken: new CancelToken(((c) => {
          cancel = c;
        })),
      },
    )
      .then((response) => {
        console.log('response', response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return response.data;
      })
      .catch((error) => {
        console.log('error', error.response);
        console.log('--------------***** Api Hit End *********-----------\n\n');
        return error.response.data;
      });
  } catch (error) {
    return false;
  }
}
