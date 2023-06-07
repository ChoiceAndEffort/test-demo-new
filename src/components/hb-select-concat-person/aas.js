import { axios } from '@hb/hb-services';

// 获取部门不分页数据
export const getDepartmentList = (data) => axios.post('/hrs/v1/department/getDepartmentList', data);

// 获取员工分页数据
export const getStaffPage = (data) => axios.post('/hrs/v1/staff/getStaffPage', data);
