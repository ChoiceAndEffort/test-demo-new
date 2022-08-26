import axios from 'axios';
import {
	Message
} from 'element-ui'

const defaultSettings = require('./settings.js')


let baseUrl = ''
//判断不同环境
console.log('VUE_APP_TITLE=' + process.env.VUE_APP_TITLE)
console.log('process.env.NODE_ENV=', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	if (process.env.VUE_APP_TITLE === 'test') {
		baseUrl = defaultSettings.testApi;
	} else if (process.env.VUE_APP_TITLE === 'release') {
		baseUrl = defaultSettings.releaseApi;
	} else {
		baseUrl = defaultSettings.productionApi;
	}
} else if (process.env.NODE_ENV === 'development') {
	baseUrl = defaultSettings.developmentApi;
}

/*axios默认设置*/
function setAxiosDefault() {
	axios.defaults.baseURL = baseUrl //默认基础路径
	axios.defaults.withCredentials = true; //跨域请求时是否需要使用凭证
	axios.defaults.timeout = defaultSettings.timeout; //超时时间
	axios.defaults.headers = {
		'Access-Control-Allow-Origin': "*"
	}
}

setAxiosDefault();

/*请求拦截*/
axios.interceptors.request.use(function (config) {
	// 添加token
	config.headers.Token ="eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiMjIwNDE4QVdXNTY2WTU1NSIsImxvZ2luVHlwZSI6MiwibW9iaWxlIjoiMTg4MjQzOTk5NTkiLCJpc0hhdmVSb2xlIjoxLCJlbnRlcnByaXNlVHlwZSI6NCwibG9naW5OYW1lIjoi6b6a56OKIiwiZW50ZXJwcmlzZUlkIjoiMjEwODA2RFlaNTFYV1lDSCIsImVudGVycHJpc2VOYW1lIjoi5rW35rOi6YeN5Z6L5bel56iL56eR5oqA6IKh5Lu95pyJ6ZmQ5YWs5Y-4Iiwic3RhZmZJZCI6IjIyMDQxOEFXVzU2QTlONEgiLCJpYXQiOjE2NjEzMDU1OTIsImV4cCI6MTY2MTM5MTk5Mn0.R6TK9jHMvZCJw45Yl2DPu9V8iuZD62UK8KlTK1fgFx8"
	return config;
}, function (error) {
	console.log('请求拦截', error)
	return Promise.reject(error);
});

/*响应拦截*/
axios.interceptors.response.use(function (response) {
	const res = response.data
	// 根据返回的状态码进行处理
	if (res.code === 0) { //如果状态码为0, 直接返回数据
		return res;
	} else { // 如果返回的状态码为其他, 弹出错误提示, 并返回数据
		if (res.msg) {
			let key = res.data ? Object.keys(res.data)[0] : undefined;
			if (key && res.data[key]) {
				Message({
					message: res.data[key] || 'Error',
					type: 'error',
				})
			} else {
				Message({
					message: res.msg || 'Error',
					type: 'error',
				})
			}
		}
		requestError(res.code);
		return Promise.reject(res)
	}
}, function (error) {
	Message({
		message: error,
		type: 'error'
	})
	return Promise.reject(error)
});


//对错误码进行处理
function requestError(code) {
	if (code === 401 || code === 403) { //如果返回码为需要登录, 则通过vuex进行退出登录处理

		window.location.reload();
	}
}


export default axios