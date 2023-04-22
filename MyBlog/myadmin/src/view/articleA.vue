<template>
  <div>
    <div class="card">
      <!-- 1.tab-position:设置标签的位置
           2.el-tabs：标签页
           3.tab-click:tab被选中时触发
       -->
      <el-tabs tab-position="top" class="tabs" @tab-click="changeTab">
        <!-- 1.label:每一个tab项的名字 -->
        <el-tab-pane label="博客管理" class="tab-content">
          <!-- 1.表单数据 
               2.data:后台获取的博客数据，格式为数组对象格式
               3.
          -->
          <el-table :data="blogsData" height="100%">
            <!-- 1.博客列表下扩展的属性
                  2.scope.row变量是当前行的数据,对象的键值对格式
                   -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" class="table-expand">
                  <el-form-item label="提交日期">
                    {{ scope.row.date }}
                  </el-form-item>
                  <el-form-item label="标题">
                    {{ scope.row.title }}
                  </el-form-item>
                  <el-form-item label="专栏">
                    {{ scope.row.classifyTitle }}
                  </el-form-item>
                  <el-form-item label="摘要">
                    {{ scope.row.digest }}
                  </el-form-item>
                  <el-form-item label="状态">
                    {{ scope.row.state ? "已发布" : "未发布" }}
                  </el-form-item>
                  <el-form-item label="点赞量">
                    {{ scope.row.favour.length }}
                  </el-form-item>
                  <el-form-item label="浏览量">
                    {{ scope.row.browse }}
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="提交日期" min-width="60">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <!-- 当前列显示的数据是 -->
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="80">
            </el-table-column>
            <el-table-column prop="classifyTitle" label="专栏" min-width="80">
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
            >新增专栏</el-button
          >
          <el-table :data="classifies" height="calc(100% - 28px)">
            <el-table-column label="提交日期" min-width="60">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="专栏名" min-width="100">
            </el-table-column>
            <el-table-column prop="digest" label="专栏介绍" min-width="180">
            </el-table-column>
            <el-table-column prop="articleNum" label="博客数量" min-width="60">
            </el-table-column>
            <el-table-column label="操作" min-width="100">
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
            <el-table-column label="评论日期" min-width="60">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="articleTitle"
              label="所属文章"
              min-width="100"
            >
            </el-table-column>
            <el-table-column prop="username" label="评论者" min-width="60">
            </el-table-column>
            <el-table-column label="操作" min-width="60">
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
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
