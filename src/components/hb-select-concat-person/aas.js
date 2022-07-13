import axios from 'axios'

// 获取部门不分页数据
export const getDepartmentList = (data) => axios.post('http://192.168.20.151:9099/aas/v1/department/getDepartmentList', data);

// 获取员工分页数据
export const getStaffPage = (data) => axios.post('http://192.168.20.151:9099/aas/v1/staff/getStaffPage', data);


// // 获取企业详情
// export const getEnterpriseDetail = (data) => axios.get('/aas/v1/enterprise/getEnterpriseDetail',{
// 	params: {
// 		id: data
// 	}
// });

// // 获取企业列表
// export const getEnterpriseList = (data) => axios.post('/aas/v1/enterprise/getEnterpriseList', data);

