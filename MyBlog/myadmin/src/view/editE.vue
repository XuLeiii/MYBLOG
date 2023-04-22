<template>
  <div class="markdown-box">
    <mavon-editor
      v-model="article.content"
      class="markdown"
      scrollStyle
      xssOptions
    />
    <button @click="dialogVisible = true" class="sub">保存</button>
    <!-- 1.center控制对话框的标题和底部的居中
         2.对话框的叉号事件
     -->
    <el-dialog title="发布文章" :visible.sync="dialogVisible" :center="true">
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
              v-for="item in classifyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" label-width="120px" prop="digest">
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
export default {
  data() {
    return {
      //控制是否显示弹出框
      dialogVisible: false,
      // 专栏列表数据
      classifyOptions: [
        {
          // 专栏下拉框数据
          value: "suibi",
          label: "随笔",
        },
      ],
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
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    async submit(formName) {
      
      const { title, digest, content ,state,classification} = this.article;
      // 检测表单是否为空，若为有表单内容为空，则valid的值是false
      
      this.$refs[formName].validate(async (valid) => {
       
        if (valid && this.article.content) {
          let res = null;
          //  //1.更新博客
          // const data = { title, digest, content, _id };
          // res = await this.$store.dispatch("updateBlog", data);
          // console.log("res", res);
          //2.添加博客
            const addData = { title, digest, content, state,classification };
            res = await this.$store.dispatch("addBlog",addData)
            console.log("res",res);
        } else {
          this.$message.warning("请注意文章内容不能为空和空红色提示！");
        }

        //2.添加博客
        // if(valid && this.article.content)
      });
    },
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
