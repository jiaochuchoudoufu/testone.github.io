import axios from "axios";

const API_URL = 'http://localhost:3000/records'

//获取所有记录
export const getRecords = async() => {
    const response = await axios.get(API_URL)
    return response.data
}

//添加记录
export const addRecord = async(record) => {
    const response = await axios.post(API_URL, record)
    return response.data
}

//删除记录
export const deleteRecord = async() => {
    const response = await axios.delete(`${API_URL}/${id}`)
}

//更新记录
export const  updateRecord = async(record) => {
    const response = await axios.put(`${API_URL}/${id}`, record)
    return response.data
}