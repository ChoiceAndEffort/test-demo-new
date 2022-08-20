import axios from 'axios'

// 获取部门不分页数据
export const getDepartmentList = (data) => axios.post('http://192.168.20.151:9099/aas/v1/department/getDepartmentList', data);

// 获取员工分页数据
export const getStaffPage = (data) => axios.post('http://192.168.20.151:9099/aas/v1/staff/getStaffPage', data);


