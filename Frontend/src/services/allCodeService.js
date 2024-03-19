import axios from "../axios";

const getAllCode = (typeInput) => {
    return axios.get(`api/get-all-code?type=${typeInput}`)
}


export { getAllCode }