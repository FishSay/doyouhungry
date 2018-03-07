<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <!--eslint-disable-next-line-->
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <!--eslint-disable-next-line-->
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <!--eslint-disable-next-line-->
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import { saveToLocal, loadFromLocal} from '../../common/js/store'
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    watch: {
      'seller' () {
        this._initScroll()
        this._initPics()
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.Picscroll) {
              this.Picscroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'// 横向滚动时候哦忽略纵向滚动
              })
            } else {
              this.Picscroll.refresh()
            }
          })
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    },
    components: {
      star, split
    }
  }
</script>

<style>
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .seller .seller-content .overview {
    position: relative;
    padding: 18px;
  }

  .seller .seller-content .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .seller-content .overview .desc {
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
  }

  .seller-content .overview .desc .star {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }

  .seller-content .overview .desc .text {
    display: inline-block;
    margin-right: 12px;
    line-height: 18px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }

  .seller .seller-content .overview .remark {
    display: flex;
    padding-top: 18px;
  }

  .seller-content .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
  }

  .seller-content .overview .remark .block:last-child {
    border: none;
  }

  .overview .remark .block h2 {
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .overview .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .remark .block .content .stress {
    font-size: 24px;
  }

  .seller .seller-content .overview .favorite {
    position: absolute;
    width: 50px;
    right: 11px;
    top: 18px;
    text-align: center;
  }

  .seller-content .overview .favorite .icon-favorite {
    display: block;
    margin-bottom: 4px;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9;
  }

  .seller-content .overview .favorite .active {
    color: rgb(240, 20, 20);
  }

  .seller-content .overview .favorite .text {
    line-height: 10px;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }

  .seller .seller-content .bulletin {
    padding: 18px 18px 0 18px;
  }

  .seller .seller-content .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .seller-content .bulletin .content-wrapper {
    padding: 0 12px 16px 12px;
  }

  .seller-content .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
  }

  .seller-content .bulletin .supports .support-item {
    padding: 16px 12px;
    font-size: 0;
  }

  .border-1px {
    position: relative;
  }

  .border-1px:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: ' ';
  }

  .seller-content .bulletin .supports .support-item:last-child {
    border: none;
  }

  .bulletin .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px !important;
    background-repeat: no-repeat !important;
  }

  .bulletin .supports .support-item .decrease {
    background: url("images/decrease_4@2x.png");
  }

  .bulletin .supports .support-item .discount {
    background: url("images/discount_4@2x.png");
  }

  .bulletin .supports .support-item .guarantee {
    background: url("images/guarantee_4@2x.png");
  }

  .bulletin .supports .support-item .invoice {
    background: url("images/invoice_4@2x.png");
  }

  .bulletin .supports .support-item .special {
    background: url("images/special_4@2x.png");
  }

  @media (min-device-pixel-ratio: 3),(-webkit-device-pixel-ratio: 3) {
    .bulletin .supports .support-item .decrease {
      background: url("images/decrease_4@3x.png");
    }

    .bulletin .supports .support-item .discount {
      background: url("images/discount_4@3x.png");
    }

    .bulletin .supports .support-item .guarantee {
      background: url("images/guarantee_4@3x.png");
    }

    .bulletin .supports .support-item .invoice {
      background: url("images/invoice_4@3x.png");
    }

    .bulletin .supports .support-item .special {
      background: url("images/special_4@3x.png");
    }
  }

  .bulletin .supports .support-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .seller .seller-content .pics {
    padding: 18px;
  }

  .seller .seller-content .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .seller-content .pics .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .seller-content .pics .pic-wrapper .pic-list {
    font-size: 0;
  }

  .pics .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }

  .pics .pic-wrapper .pic-list .pic-item:last-child {
    margin: 0
  }

  .seller .seller-content .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
  }

  .seller .seller-content .info .title {
    padding-bottom: 12px;
    line-height: 14px;
    font-size: 14px;
  }

  .seller .seller-content .info .info-item {
    padding: 16px 12px;
    line-height: 16px;
    font-size: 12px;
  }

  .seller .seller-content .info .info-item:last-child {
    border: none;
  }
</style>
