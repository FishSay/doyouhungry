<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <!-- eslint-disable-next-line -->
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <!-- eslint-disable-next-line -->
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <!-- eslint-disable-next-line -->
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import BScroll from 'better-scroll'
  const ERR_OK = 0
  export default {
    prop: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        selectFood: {}
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    }
  }
</script>

<style>
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }

  .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
  }

  .menu-wrapper .menu-item .text .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px !important;
    background-repeat: no-repeat !important;
    vertical-align: top;
  }

  .menu-wrapper .menu-item .text .decrease {
    background: url("images/decrease_3@2x.png");
  }

  .menu-wrapper .menu-item .text .discount {
    background: url("images/discount_3@2x.png");
  }

  .menu-wrapper .menu-item .text .guarantee {
    background: url("images/guarantee_3@2x.png");
  }

  .menu-wrapper .menu-item .text .invoice {
    background: url("images/invoice_3@2x.png");
  }

  .menu-wrapper .menu-item .text .special {
    background: url("images/special_3@2x.png");
  }

  @media (min-device-pixel-ratio: 3),(-webkit-device-pixel-ratio: 3) {
    .menu-wrapper .menu-item .text .decrease {
      background: url("images/decrease_3@3x.png");
    }

    .menu-wrapper .menu-item .text .discount {
      background: url("images/discount_3@3x.png");
    }

    .menu-wrapper .menu-item .text .guarantee {
      background: url("images/guarantee_3@3x.png");
    }

    .menu-wrapper .menu-item .text .invoice {
      background: url("images/invoice_3@3x.png");
    }

    .menu-wrapper .menu-item .text .special {
      background: url("images/special_3@3x.png");
    }
  }

  .goods .foods-wrapper {
    flex: 1;
  }

  .foods-wrapper .food-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .foods-wrapper .food-list .food-item {
    display: flex;
    margin: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    padding-bottom: 18px;
  }

  .foods-wrapper .food-list .food-item:last-child {
    border: none;
    margin-bottom: 0;
  }

  .food-list .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .food-list .food-item .content {
    flex: 1;
  }

  .food-list .food-item .content .name {
    font-size: 14px;
    margin: 2px 0 8px 0;
    line-height: 14px;
    height: 14px;
    color: rgb(7, 17, 27);
  }

  .food-list .food-item .content .desc {
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .food-list .food-item .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .food-item .content .extra .count {
    margin-right: 12px;
  }

  .food-list .food-item .content .price {
    font-weight: 700;
    line-height: 24px;
  }

  .food-item .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .food-item .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
</style>