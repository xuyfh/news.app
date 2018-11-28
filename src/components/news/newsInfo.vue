<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newslist.title }}</h3>
        <p class="subtitle"> 
            <span>发表时间：{{ newslist.add_time | dateFormat }}</span>    
            <span>点击次数：{{ newslist.click }}次</span>    
        </p>
        <hr /> 
        <div class="content" v-html="newslist.content">
        </div>  
        <public-comment :id="this.id"></public-comment>
    </div>    
</template>

<script>
import comment from '../subcomments/comment.vue'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newslist: {}
        }
    },
    created() {
        this.showmsg(this.id)
    },
    methods: {
        showmsg(id) {
            this.$http.get('api/getnew/'+this.id).then(
                data => {
                    if(data.body.status == 0) {
                        this.newslist = data.body.message[0]
                    } else {
                        Toast("请求数据失败")
                    }
                }
            )
        }
    },
    components: {
        'public-comment': comment
    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
