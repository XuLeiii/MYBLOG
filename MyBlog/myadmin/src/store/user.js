// import { setToken,setUserInfo} from "../util";
import {login,register} from "../api/api.js"
const state = {

}

const actions = {
    //1.用户登录，向服务器发送请求
   async login( state,data ){
        //测试vue组件到vuex传值是否畅通，
        // console.log("data",data);
        let result = await login(data)
        // console.log("data",data);
        console.log("result",result);
        return result
        //请求成功，设置token
        // if(result.status === 200){
        //     console.log("result",result);
        //     // setUserInfo(result.data.user);
		// 	// setToken(result.data.token);
        // }else {
        //     return result
        // }
    },
    //2,用户注册，向后端服务器发送请求
    async register(state,data){
        let result = await register(data)
        //测试result是否接受到经由响应拦截器返回的后端的数据
        console.log("这里接收到返回参数的result",result);
        return result.data
    }
}

export default {
    actions,state
}