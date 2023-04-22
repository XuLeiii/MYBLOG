
import {addBlog} from "../api/api"

const state  = {

}

const actions  = {
    // async updateBlog(state, data) {
	// 	// return await updateBlog(data);
	// },
   async addBlog(state,data){
    return await addBlog(data)
   }
}

export default {actions,state}