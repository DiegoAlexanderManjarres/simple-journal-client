import axios from 'axios'

let axiosCancel = null



/**
 *  axiosClient({ <query>, <variables> })
 * 
 * takes a graphql query object with the query, and variables
 */
const axiosClient = async (query) => {
    // console.log('backend_url', process.env.GATSBY_BACKEND_URL)
    let response
    try {
        response = await axios({
            url: process.env.GATSBY_BACKEND_URL,
            method: 'post',
            data: query,
            withCredentials: true,
            cancelToken: new axios.CancelToken((c) => { axiosCancel = c }) 
        }) 
    } catch (error) {
        throw new Error(error)
    }    
    console.log('response', response.data)

    return response.data
}

export { axiosCancel }
export default axiosClient