<template>
  <div id="app">
    <Header :seller="seller"></Header><!--添加v-bind，将数据传给header.vue-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  import { urlParse } from './common/js/util'

  const ERR_OK = 0
  export default {
    name: 'App',
    components: {
      Header
    },
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    }
  }
</script>

<style>
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .tab:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab .tab-item a {
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab .tab-item .active {
    color: rgb(240, 20, 20);
  }
</style>
