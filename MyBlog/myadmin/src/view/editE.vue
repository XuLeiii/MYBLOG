<template>
  <div class="markdown-box">
    <mavon-editor
      v-model="article.content"
      class="markdown"
      ref="md"
      @imgAdd="imgAdd"
      scrollStyle
      xssOptions
    />
    <button @click="dialogVisible = true" class="sub">保存</button>
    <el-dialog title="发布文章" :visible.sync="dialogVisible" :center="true">
      <!-- 1.center控制对话框的标题和底部的居中2.对话框的叉号事件-->
      <!-- 1.model指定收集表单中输入的数据到article对象变量中，双向数据绑定
         2.rules控制表单校验规则
     -->
      <el-form :model="article" ref="form" :rules="formRules">
        <!-- 1.label-width表单项的宽度
             2.prop指定该表单的校验规则是formRules中的哪个
         -->
        <el-form-item label="标题" label-width="120px" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="专栏" label-width="120px" prop="classification">
          <el-select
            placeholder="请选择专栏"
            filterable
            v-model="article.classification"
          >
            <!-- 1.label为下拉列表中选项
               2.value为每个专栏的标识
           -->
            <el-option
              v-for="(item, index) in classifies"
              :key="index"
              :label="item.title"
              :value="item.title"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" label-width="120px" prop="digest">
          <el-input v-model="article.digest"></el-input>
        </el-form-item>
        <el-form-item label="是否发布" label-width="150px">
          <!-- 1.switch开关标签 -->
          <el-switch v-model="article.state" active-text="发布"> </el-switch>
        </el-form-item>
      </el-form>
      <!-- 确定 取消 重置 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="submit('form')">确 定</el-button>
        <!-- element自带的表单方法 -->
        <el-button type="warn" @click="$refs.form.resetFields()"
          >重置</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { mapGetters } from "vuex";
import { uploadImg } from "../api/api.js";
export default {
  data() {
    return {
      //控制是否显示弹出框
      dialogVisible: false,
      //文章数据
      article: {
        title: "", //标题
        classification: "", //专栏
        digest: "", //摘要
        state: false, //是否发布
        content: "", //文章内容
      },
      //表单校验
      formRules: {
        digest: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          {
            min: 10,
            max: 50,
            message: "长度在 10 到 50 个字符",
            trigger: ["blur", "change"],
          },
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      isUpdate: 0,
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    async submit(formName) {
      const { title, digest, content, state, classification, _id } =
        this.article;
      // 检测表单是否为空，若为有表单内容为空，则valid的值是false
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.article.content) {
          let res = null;
          if (this.isUpdate) {
            //1.更新博客
            console.log("更新");
            const data = { title, digest, content, _id, classification };
            res = await this.$store.dispatch("updateBlog", data);
            this.$message.success("博客更新成功");
            this.$router.push("/home/result");
          } else {
            //2.添加博客
            const addData = { title, digest, content, state, classification };
            console.log("专栏提交", classification);
            res = await this.$store.dispatch("addBlog", addData);
            console.log("res", res);
            if (res.status === 200) {
              this.dialogVisible = false;
              this.$message.success("博客添加成功");
              this.$router.push("/home/result");
            }
          }
        } else {
          this.$message.warning("请注意文章内容不能为空和空红色提示！");
        }
        //2.添加博客
        // if(valid && this.article.content)
      });
    },
    // 将图片上传到服务器，返回地址替换到md中
    async imgAdd(pos, $file) {
      //上传图片,file是传入的图片的数据信息
      console.log("$file", $file);
      let $vm = this.$refs.md;
      const formData = new FormData();
      if ($file.type.indexOf("image") === 0) {
        let reader = new FileReader(),
          img = new Image();
        reader.readAsDataURL($file);
        reader.onload = function (e) {
          console.log("e", e.target.res);
          img.src = e.target.result;
        };
        img.onload = async function () {
          console.log("3");
          // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          // 图片原始尺寸
          let originWidth = this.width;
          let originHeight = this.height;
          // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
          let maxWidth = 800,
            maxHeight = 800;
          // 目标尺寸
          let targetWidth = originWidth,
            targetHeight = originHeight;
          // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
          //压缩后的图片转base64 url
          let newUrl = canvas.toDataURL("image/jpeg", 0.6); //base64 格式
          // base64 转 blob 再转 file
          let arr = newUrl.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
            bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 转blob
          let filename = Date.parse(new Date());
          // 转file
          let file = new File([u8arr], filename, { type: mime });
          // 将图片上传到服务器
          console.log("file", file);
          formData.append("artimg", file);
          console.log("!!!!!!!");
          console.log("formate", formData);
          let res = await uploadImg(formData);
          if (res.status === 200) {
            $vm.$img2Url(pos, res.artimgUrl);
          }
        };
      }
    },
  },
  computed: {
    ...mapGetters(["classifies"]),
  },
  mounted() {
    if (this.$route.query.row) {
      this.article = this.$route.query.row;
      console.log("this.article", this.article);
      this.isUpdate = this.$route.query.isUpdate;
    }
  },
};
</script>

<style lang="less" scoped>
.markdown-box {
  padding: 0 !important;
  background-color: transparent !important;
  .markdown {
    height: calc(100% - 70px);
  }
  .sub {
    background-color: #323232;
    color: #ffffff;
    width: 100px;
    height: 30px;
    margin-top: 10px;
    box-shadow: 4px 4px 10px #888888;
    border-radius: 5%;
    border: 0;
    margin-left: 50%;
    transform: translate(-50%);
  }
}
</style>
