<template>
  <div class="page8">
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
const LENGTH = 10; // 切片数量
export default {
  name: "page8",
  components: {},
  data() {
    return {
      container: {
        file: null,
      },
    };
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return0;
      const loaded = this.data
        .map((item) => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    },
  },
  methods: {
    request({ url, method = "post", data, headers = {}, requestList }) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach((key) =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = (e) => {
          resolve({
            data: e.target.response,
          });
        };
      });
    },

    handleFileChange(e) {
      console.log(e.target.files, 66666666666);
      const [file] = e.target.files;
      this.container.file = file;
    },

    // 生成文件切片
    createFileChunk(file, length = LENGTH) {
      const fileChunkList = [];
      const chunkSize = Math.ceil(file.size / length);
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
      }
      return fileChunkList;
    },
    // 上传切片，同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .map(({ chunk }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(async ({ formData }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData,
            onProgress: this.createProgressHandler(this.data[index]),
          })
        );
      await Promise.all(requestList);
      // 合并切片
      await this.mergeRequest();
    },

    createProgressHandler(item) {
      return (e) => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      };
    },

    //发送合并请求
    async mergeRequest() {
      await this.request({
        url: "http://localhost:3000/merge",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          filename: this.container.file.name,
        }),
      });
    },

    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.container.hash = await this.calculateHash(fileChunkList);
      const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      if (!shouldUpload) {
        this.$message.success("秒传：上传成功");
        return;
      }
      this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index,
        chunk: file,
        percentage: uploadedList.includes(index) ? 100 : 0,
      }));
      await this.uploadChunks(uploadedList);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.page8 {
}
</style>