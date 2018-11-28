<template>
    <div>
        <ul class="mui-table-view" v-for="item in newslist" :key="item.id">
				<li class="mui-table-view-cell mui-media">
					<router-link :to="'/home/newsInfo/' + item.id">
						<img class="mui-media-object mui-pull-left" src="">
						<div class="mui-media-body">
							<h1>{{  item.title  }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{  item.add_time | dateFormat  }}</span>
                                <span>点击人数：{{  item.click  }}</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>    
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            newslist: []
        }
    },
    created() {
        this.getnewsList()
    },
    methods: {
        getnewsList() {
            this.$http.get('api/getnewslist').then(
                data => {
                    if(data.body.status == 0){
                        this.newslist = data.body.message
                    } else {
                        Toast("获取数据失败")
                    }
                }
            )
        }
    }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
    li{
        h1{
            font-size: 14px;
        }
    }
    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
    }
}
</style>
