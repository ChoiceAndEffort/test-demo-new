<template>
    <el-dialog :visible.sync="dialogFormVisible" width="960px" :modal="modal">
        <div slot="title" class="title-header">
            <h3>选择人员</h3>
            <el-autocomplete
                v-model.trim="filterText"
                :fetch-suggestions="querySearchAsync"
                value-key="copyName"
                placeholder="请输入人员姓名"
                size="small"
                :debounce="1000"
                clearable
                @select="handleSelect"
            ></el-autocomplete>
        </div>
        <div v-loading="loading" class="person-wrap">
            <div class="tree-container">
                <slot name="tab"></slot>
                <div class="tree">
                    <el-tree
                        :key="getDepartMentSendData.type"
                        ref="selectPerson"
                        :props="treeProps"
                        :load="loadNode"
                        lazy
                        :render-after-expand="false"
                        show-checkbox
                        node-key="staffId"
                        :default-expand-all="defaultExpandAll"
                        @check-change="handleCheckChange"
                        @node-expand="handleNodeExpand"
                    >
                        <div slot-scope="{ node, data }" class="custom-tree-node">
                            <div>{{ node.label }}</div>

                            <div v-if="![0, 1].includes(data.level)" class="custom-tree-node-child">
                                {{ data.level }}
                                {{ (data.positionList && data.positionList[0] && data.positionList[0].departmentName) || '--' }}
                                {{ (data.positionList && data.positionList[0] && data.positionList[0].name) || '--' }}{{ data.mobile || '--' }}
                            </div>
                        </div>
                    </el-tree>
                </div>
            </div>
            <div class="list-container">
                <ShowList :check-all-arr="checkAllArr" :max-select="maxSelect" @showListDelOne="showListDelOne" @showListDelAll="showListDelAll" />
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="close">取 消</el-button>
            <el-button type="primary" size="small" @click="handleConfirm">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import ShowList from './show-list.vue';
import { getStaffPage, getDepartmentList } from './aas.js';

export default {
    components: {
        ShowList
    },
    props: {
        maxSelect: {
            //最大选择数量, 通过该数量来决定是单选还是多选, 如果人员只能单选填1
            type: Number,
            default: 1000
        },
        enterpriseId: {
            //企业id
            type: String,
            required: false,
            default: '210806DYZ51XWYCH'
        },
        getDepartMentSendData: {
            //查询公司传递的参数
            type: Object,
            required: false,
            default: () => {} // eslint-disable-line
        },
        selectedPerson: {
            //已选择的人员
            type: Array,
            required: false,
            default: () => {} // eslint-disable-line
        },
        modal: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            treeProps: {
                label: 'name',
                children: 'name'
            },
            departMentList: undefined, //部门数据list
            staffPageList: undefined, //部门员工list
            dialogFormVisible: false,
            checkAllArr: [], //选择的人员数组
            filterText: '',
            pageSize: 100000,
            defaultExpandAll: false,
            loading: false,
            initArr: []
        };
    },
    watch: {
        checkAllArr: {
            handler(nv) {
                // console.log(nv, '88');
                if (nv.length > this.maxSelect) {
                    document.getElementsByClassName('el-message').length === 0 &&
                        this.$message({
                            message: `最多选取${this.maxSelect}条`,
                            type: 'warning'
                        });
                    this.checkAllArr = nv.slice(0, this.maxSelect);
                    return false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.getDepartMent();
    },
    methods: {
        handleSelect(item) {
            if (this.checkAllArr.length >= this.maxSelect) {
                this.$message({
                    message: `最多选取${this.maxSelect}条`,
                    type: 'warning'
                });
                return false;
            }
            if (this.checkAllArr.find((el) => el.staffId === item.id)) return false;
            this.checkAllArr.push({
                ...item,
                id: item.staffId
            });
            this.$refs.selectPerson.setCheckedKeys(this.checkAllArr.map((item) => item.staffId));
        },

        async querySearchAsync(queryString, cb) {
            if (!queryString) return;
            this.loading = true;
            try {
                const res = await getStaffPage({
                    page: 0,
                    size: this.pageSize,
                    enterpriseId: this.enterpriseId, //企业id,
                    name: queryString
                });
                this.staffPageList = res.data.data;
                const dealData = res?.data?.data?.map((item) => {
                    return {
                        ...item.staff,
                        positionList: item.positionList,
                        id: item.staff.staffId,
                        copyName: `${item.staff.name}-${item.positionList?.[0]?.departmentName || ''}`
                    };
                });
                this.loading = false;
                cb && cb(dealData);
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },

        async show() {
            this.dialogFormVisible = true;
            const arr = this.selectedPerson.map(async (item) => {
                const res = await getStaffPage({
                    page: 0,
                    size: this.pageSize,
                    enterpriseId: this.enterpriseId, //企业id
                    staffId: item
                });
                return res;
            });
            let res2 = await Promise.allSettled(arr);
            res2 = res2?.map((item) => item.value.code === 0 && item.value.data.data);

            this.checkAllArr = res2.flat().map((item) => {
                return {
                    ...item.staff,
                    positionList: item.positionList,
                    id: item.staff.staffId
                };
            });
            this.$refs.selectPerson && this.$refs.selectPerson.setCheckedKeys(this.checkAllArr.map((item) => item.staffId));
        },
        close() {
            this.dialogFormVisible = false;
            this.checkAllArr = [];
            this.filterText = '';
            this.$refs.selectPerson.setCheckedKeys([]);
        },

        loadNode(node, resolve) {
            console.log('加载节点', node, node.data?.children, node.data?.staffId);

            if (node.level === 0) {
                const arr = this.departMentList.map((item) => {
                    return {
                        ...item,
                        disabled: true
                    };
                });
                return resolve(arr);
            }
            if (node.data.children && !!node.data.children.length) {
                console.log('来这了---');
                const childrenArr = node.data.children.map((item) => {
                    return {
                        ...item,
                        disabled: !item.children || item.children.length
                    };
                });
                return resolve(childrenArr);
            }
            if (!node.data?.staffId) {
                this.getStaffPageMethods('', '', node.data.departmentId, node, resolve);
            }
            return resolve([]);
        },

        async handleCheckChange(data, checked) {
            if (this.checkAllArr.length > this.maxSelect) {
                document.getElementsByClassName('el-message').length === 0 &&
                    this.$message({
                        message: `最多选取${this.maxSelect}条`,
                        type: 'warning'
                    });
                return false;
            }

            data.id && this.$refs.selectPerson.setMyChecked && this.$refs.selectPerson.setMyChecked(data, checked, true);
            //右边渲染列表
            const getCheckedStaffInfo = this.$refs.selectPerson.getCheckedNodes().filter((item) => item.level !== 1);

            if (checked) {
                this.checkAllArr = [...this.checkAllArr, ...getCheckedStaffInfo].reduce((pre, cur) => {
                    pre.findIndex((item) => item.staffId === cur.staffId) > -1 ? pre : pre.push(cur);
                    pre.forEach((item, index, array) => {
                        if (!item.staffId) {
                            array.splice(index, 1);
                        }
                    });
                    return pre;
                }, []);
            } else {
                this.checkAllArr = this.checkAllArr.filter((item) => item.staffId !== data.staffId);
            }

            //第一个是右侧选择了
            // console.log("看下变化的值", data, checked, indeterminate);
        },

        handleNodeExpand() {
            this.$refs.selectPerson.setCheckedKeys(this.checkAllArr.map((item) => item.staffId));
        },

        async getDepartMent() {
            try {
                this.loading = true;
                const res = await getDepartmentList({
                    enterpriseId: this.enterpriseId,
                    ...this.getDepartMentSendData
                    // name: '海波重科江夏子公司'
                });
                this.loading = false;
                this.departMentList = res.data;

                // console.log('最新的部门-+----------', this.departMentList[2]);
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },

        // 获取部门人员信息
        async getStaffPageMethods(name = '', staffId = '', departmentId = '', node, resolve) {
            this.loading = true;
            try {
                const params = {
                    page: 0,
                    size: this.pageSize,
                    enterpriseId: this.enterpriseId, //企业id,
                    name,
                    staffId
                };
                let keyName = this.getDepartMentSendData.type == 1 ? 'productionDepartmentId' : 'departmentId'; // eslint-disable-line
                params[keyName] = departmentId;
                const res = await getStaffPage(params);
                this.staffPageList = res.data.data;
                if (res?.data?.data?.length) {
                    //如果下一级有值,关闭上一级的禁用
                    node.data.disabled = false;
                }
                const dealData = res?.data?.data?.map((item) => {
                    return {
                        ...item.staff,
                        positionList: item.positionList,
                        id: item.staff.staffId
                    };
                });
                this.loading = false;
                return resolve(dealData);
                // return dealData;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        //取消勾选单个
        showListDelOne(value) {
            this.$refs.selectPerson.setCheckedKeys(value);
            this.checkAllArr = this.checkAllArr.filter((item) => value.includes(item.staffId));
        },
        //批量取消勾选
        showListDelAll(value) {
            this.$refs.selectPerson.setCheckedKeys(value);
            this.checkAllArr = value;
        },
        handleConfirm() {
            this.$emit('getPersonArr', this.checkAllArr);
            this.close();
        }
    }
};
</script>

<style scoped lang="scss">
.title-header {
    display: flex;
    width: 95%;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    h3 {
        width: 100px;
    }
    .search {
        width: 228px;
    }
}
.person-wrap {
    display: flex;
    border-bottom: 1px solid #e4e7ed;
    ::v-deep .el-tabs {
        background: #f8f8f8;
        .el-tabs__header {
            margin: 0px;
            padding: 0 17px;
            height: 40px;
            border-top: 1px solid #e4e7ed;
            border-bottom: 1px solid #e4e7ed;
            box-sizing: border-box;
        }
        .el-tabs__item {
            font-size: 12px !important;
            color: #1678ff;
        }
        .el-tabs__nav-wrap::after {
            height: 0px;
        }
    }
    .tree {
        max-height: 500px;
        overflow-y: auto;

        .custom-tree-node {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .custom-tree-node-child {
                font-size: 12px;
                color: #a3a8ad;
                margin-top: 3px;
                //  max-height: 52px;
            }
        }
    }
    .tree-container {
        background: #fff;
        width: 470px;
        border-right: 1px solid #e4e7ed;
        .tree {
            padding: 17px;
        }
    }
    .list-container {
        flex: 1;
        background: #fff;
    }
}
::v-deep .el-dialog__header {
    padding: 5px 20px 5px;
}
::v-deep .el-dialog__body {
    padding: 0px;
}
::v-deep .el-dialog__footer {
    padding: 10px 20px;
}
::v-deep .el-tree-node__children {
    .el-tree-node__content {
        height: 52px;
        line-height: 21px;
    }
}
</style>
