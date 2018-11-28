<template>
    <div class="cmt-container">   
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入你要评论的内容（最多120个字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="index">
                <div class="cmt-title">
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-content">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>    
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg: ''
    };
  },
  props: ["id"],
  created() {
    this.getcomment();
  },
  methods: {
    getcomment() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          if (res.body.status == 0) {
              this.comments = this.comments.concat(res.body.message)
          } else {
            Toast("请求数据失败");
          }
        });
    },
    loadMore() {
        this.pageindex ++
        this.getcomment()
    },
    postComment() {
      if(this.msg.trim().length == 0) {
        return Toast('评论内容不能为空!')
      }
      this.$http.post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim() })
        .then(data => {
          if(data.body.status == 0) {
            this.comments.unshift({
              user_name: '匿名用户',
              add_time: new Date(),
              content: this.msg
            })
          } else {
            Toast("添加评论失败！")
          }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-content {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

