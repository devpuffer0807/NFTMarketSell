import axios from "axios"
import { OPENSEA_API_URL } from "../Config/opensea"
axios.defaults.baseURL = OPENSEA_API_URL;
// axios.defaults.headers.common['Authorization'] = store.getState('token');
export default axios