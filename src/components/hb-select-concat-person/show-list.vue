<template>
    <div class="show-list-wrap">
        <div class="show-list-header">
            <div class="title">
                已选择
                <!-- ({{ arr.length }}) -->
                ({{ arr.length }}
                <span>/{{ maxSelect }} </span>
                )
            </div>
            <el-button type="text" class="clear pointer" :disabled="!arr.length" @click="handleClear">清空</el-button>
        </div>

        <ul class="show-list">
            <!-- {{
        arr
      }} -->
            <li v-for="(item, index) in arr" :key="index" class="list-item pointer">
                <div class="list-item-con">
                    <div class="name">
                        {{ item.name }}
                        <!-- {{JSON.parse(item.split('&')[1]).staff.name}} -->
                    </div>
                    <div class="info">
                        {{ (item.positionList && item.positionList[0] && item.positionList[0].departmentName) || '--' }}
                        {{ (item.positionList && item.positionList[0] && item.positionList[0].name) || '--' }}{{ item.mobile || '--' }}
                        <!-- {{JSON.parse(item.split('&')[1]).positionList[0]?JSON.parse(item.split('&')[1]).positionList[0].departmentName:'--'}} {{JSON.parse(item.split('&')[1]).positionList[0]?JSON.parse(item.split('&')[1]).positionList[0].name:'--'}} {{JSON.parse(item.split('&')[1]).staff.mobile}} -->
                    </div>
                </div>
                <i class="el-icon-close" @click="handleDelOne(index, item)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        checkAllArr: {
            type: Array,
            default: () => {} // eslint-disable-line
        },
        maxSelect: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            arr: []
        };
    },
    watch: {
        checkAllArr: {
            handler(newList) {
                if (newList) {
                    this.arr = newList.filter((item) => !item.level && item.level !== 0); //过滤掉父级的选择
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        handleDelOne(index) {
            this.arr.splice(index, 1);
            this.$emit(
                'showListDelOne',
                this.arr.map((item) => item.id)
            );
        },
        handleClear() {
            this.arr.splice(0, this.arr.length);
            console.log('清空后的arr--------this.arr', this.arr);
            this.$emit('showListDelAll', this.arr);
        }
    }
};
</script>

<style scoped lang="scss">
.show-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 0 16px;
    background: #f8f8f8;
    height: 40px;
    box-sizing: border-box;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    .clear {
        color: #1989fa;
    }
}
.show-list {
    padding: 17px 0;
    max-height: 500px;
    overflow-y: auto;
}
.list-item {
    display: flex;
    align-items: center;
    height: 46px;
    line-height: 13px;
    padding: 0 16px;
    .list-item-con {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
            font-size: 12px;
            color: #000000;
            padding-bottom: 6px;
        }
        .info {
            font-size: 12px;
            color: #909399;
        }
    }
    .el-icon-close {
        display: none;
        font-size: 12px;
    }
}
.list-item:hover {
    background: #f3f3f3;
    .el-icon-close {
        display: block;
        font-size: 12px;
    }
}
</style>
