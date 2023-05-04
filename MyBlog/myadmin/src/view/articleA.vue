<template>
  <div class="card">
    <el-tabs tab-position="top" class="tabs" @tab-click="changeTab">
      <!-- 1.tab-position:设置标签的位置 2.el-tabs：标签页 3.tab-click:tab被选中时触发-->
      <el-tab-pane label="博客管理" class="tab-content">
        <!-- 1.label:每一个tab项的名字 -->
        <el-table :data="blogs">
          <!-- 1.表单数据 2.data:后台获取的博客数据，格式为数组对象格式-->
          <el-table-column type="expand" min-width="60"
            ><!-- 1.博客列表下扩展的属性2.scope.row变量是当前行的数据,对象的键值对格式，数据来源于表单的blogsData3.type="expand"列的类型是可展开的4.slot-scope="scope"中的scope是-->
            <template slot-scope="scope">
              <el-form label-position="left" class="table-expand">
                <el-form-item label="提交日期" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.date }}
                </el-form-item>
                <el-form-item label="标题" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.title }}
                </el-form-item>
                <el-form-item label="专栏" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.classification }}
                </el-form-item>
                <el-form-item label="简介" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.digest }}
                </el-form-item>
                <el-form-item label="状态" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.state ? "已发布" : "未发布" }}
                </el-form-item>
                <el-form-item label="点赞量" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.favour.length }}
                </el-form-item>
                <el-form-item label="浏览量" style="margin: 0px 0px 0px 60px">
                  {{ scope.row.browse }}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="提交日期" min-width="60">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
              <!-- 当前列显示的数据是 -->
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="80">
          </el-table-column>
          <el-table-column prop="classification" label="专栏" min-width="80">
          </el-table-column>
          <el-table-column label="状态" min-width="50">
            <template slot-scope="scope">
              {{ scope.row.state ? "已发布" : "未发布" }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="favour.length" label="点赞量" min-width="40"> </el-table-column> -->
          <!-- <el-table-column prop="browse" label="浏览量" min-width="40"> </el-table-column> -->
          <el-table-column label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button size="mini" @click="Edit(scope.row, 'blog')"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="changeState(scope.row, 'blog')"
                >{{ scope.row.state ? "下架" : "发布" }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteItem(scope.row, 'blog')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="专栏管理" class="tab-content">
        <el-button
          type="primary"
          size="mini"
          @click="addItem('classify')"
          class="sub"
          style="margin-left: 20px"
          >新增专栏</el-button
        >
        <el-table :data="classifies">
          <el-table-column label="提交日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="专栏名"> </el-table-column>
          <el-table-column prop="digest" label="专栏介绍"> </el-table-column>
          <el-table-column prop="articleNum" label="博客数量"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="Edit(scope.row, 'classify')"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteItem(scope.row, 'classify')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论管理" class="tab-content">
        <el-table
          :data="comments"
          row-key="_id"
          :tree-props="{ children: 'children' }"
          height="100%"
        >
          <el-table-column label="评论日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="articleTitle" label="所属文章" min-width="100">
          </el-table-column>
          <el-table-column prop="username" label="评论者"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteItem(scope.row, 'comment')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 专栏表单 -->
    <el-dialog
      title="新增专栏"
      :visible.sync="dialogVisible"
      center
      @close="resetForm('form')"
    >
      <el-form :model="form" ref="form" :rules="formRules">
        <el-form-item label="专栏名" label-width="120px" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="专栏介绍" label-width="120px" prop="digest">
          <el-input v-model="form.digest"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        digest: "",
      }, //输入框数据
      dialogVisible: false, //专栏表单是否显示
      formRules: {
        title: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        digest: [
          { required: true, message: "请输入描述信息", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      currentTab: 0, //当前选中tab的索引号
      comments: [], //评论标签
      id: "",
    };
  },
  computed: {
    ...mapGetters(["blogs", "classifies"]),
    // blogsData() {
    //   let id;
    //   this.blogs.forEach((element) => {
    //     id = element.classification;
    //     for (let ele of this.classifies) {
    //       if (ele._id === id) {
    //         element.classifyTitle = ele.title;
    //         break;
    //       }
    //     }
    //   });
    //   return JSON.parse(JSON.stringify(this.blogs));
    // },
  },
  methods: {
    //控制博客，专栏的编辑表单是否显示
    async Edit(row, type) {
      switch (type) {
        case "blog":
          console.log("typeeeeee", type);
          console.log("rowwwwww", row);
          await this.$store.dispatch("getBlogs", { _id: row._id });
          this.$router.push({
            path: "/home/editE",
            query: { row: row, isUpdate: 1 },
          });
          break;
        case "classify":
          this.form.title = row.title;
          this.form.digest = row.digest;
          this.dialogVisible = true;
          this.id = row._id;
          break;
      }
    },
    //获取文章列表
    async getBlogs() {
      await this.$store.dispatch("getBlogs"); //获取文章列表

    },
    //增，改，查，专栏和博客的内容
    async submit(formName) {
      let res = null;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.id) {
            console.log("update");
            res = await this.$store.dispatch("updateClassifyTitle", {
              _id: this.id,
              ...this.form,
            });
            console.log("res123", res);
            this.dialogVisible = false;
            this.$message.success(res.data.msg);
          } else {
            res = await this.$store.dispatch("addClassify", this.form);
            if (res.data.status === 200) {
              // 修改成功后清空值
              this.dialogVisible = false;
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.msg || "出错啦！");
            }
          }
          await this.$store.dispatch("getClassifies");
        } else {
          this.$message.warning("信息不完整，请注意红色提示");
          return false;
        }
      });
    },
    //删除和查询专栏和博客的内容
    async deleteItem(row, type) {
      let res = null;
      switch (type) {
        case "blog":
          res = await this.$store.dispatch("deleteBlog", {
            _id: row._id,
            classification: row.classification,
          });
          this.$store.dispatch("getBlogs");
          break;
        case "classify":
          res = await this.$store.dispatch("deleteClassify", { _id: row._id });
          this.$store.dispatch("getClassifies");
          break;
        // case "comment":
        //   console.log("r", row);
        //   if (row.keyId) {
        //     res = await deleteFirstComment({ _id: row._id });
        //   } else {
        //     res = await deleteSecondComment({
        //       _id: row.fatherId,
        //       replyId: row._id,
        //     });
        //   }
        //   const result = await getComments();
        //   this.comments = result.data;
      }
      if (res.status === 200) {
        this.$message.success(res.data.msg);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    //新增专栏表单是否显示
    addItem() {
      this.dialogVisible = true;
    },
    // 重置表单数据
    resetForm(formName) {
      this.id = "";
      this.form.title = "";
      this.form.digest = "";
      this.$refs[formName].clearValidate();
    },
    //点击不同标签触发不同请求
    async changeTab(tab) {
      this.currentTab = tab.index;
      console.log("currentTab", this.currentTab);
      if(this.currentTab == 0){
        console.log("更新博客列表");
        this.$store.dispatch("getBlogs")
      }
      else if (this.currentTab == 1) {
        this.$store.dispatch("getClassifies");
      } else if (this.currentTab == 2) {
        const res = await getComments();
        if (res.status == 200) {
          this.comments = res.data;
        }
      }
    },
  },
  mounted() {
    this.getBlogs();
  },
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  // .tab-content {
  //   height: 100%;

  //   .table-expand .el-form-item {
  //     margin-right: 0;
  //     margin-bottom: 0;
  //   }
  // }
}
</style>
