import axios from 'axios';

let AUTH_TOKEN = undefined;

//========== configuration
axios.defaults.baseURL = 'https://api.example.com';

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Override timeout for this request as it's known to take a long time
// instance.get('/longRequest', {
//   timeout: 5000
// });

// end of configuration ==========

// Begin of interceptors ======
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
// End of interceptors ======

let instance = axios.create({
    baseURL: 'https://api.example.com'
});
 // Alter defaults after instance has been created
 instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

 // Override timeout default for the library
 // Now all requests using this instance will wait 2.5 seconds before timing out
 instance.defaults.timeout = 2500;

function Configure(baseURL) {
    // Set config defaults when creating the instance
    instance = axios.create({
        baseURL
    });
    return instance;
}

async function LoginWithEmail(email, password) {
    return await instance.post('/api/v1/users/sign_in', {"user[email]": email, "user[password]": password})
}

async function LoginWithPhone(phone, password) {
  return await instance.post('/api/v1/users/sign_in', {"user[mobile]": phone, "user[password]": password})
}

async function MyInfo() {

}
export default {
  LoginWithEmail,
  LoginWithPhone,
  MyInfo,
  Configure
}