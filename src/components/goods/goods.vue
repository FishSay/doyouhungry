<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- eslint-disable-next-line -->
          <li v-for="(item,index) in goods" class="menu-item"
              :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!-- eslint-disable-next-line -->
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <!-- eslint-disable-next-line -->
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"
                :select-foods="selectFoods"
                ref="shopcart"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" @cart-add="cartAdd"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'

  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 ||
            (this.scrollY >= height1 &&
              this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) { // 因为在pc模式下，点击事件会触发两次，所以加上了event，
          // 以及这个if，如果是pc模式，这个手机模式下的点击事件就跳出了
          return
        }
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
      },
      _drop (target) {
        // 体验优化，
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 告诉我们实时滚动的位置
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      cartAdd (target) {
        this._drop(target)
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
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

  .menu-wrapper .current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background: #fff;
    font-weight: 700;
  }

  .menu-wrapper .current .text {
    border: none;
  }

  .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, .2);
  }

  .menu-wrapper .menu-item:last-child .text {
    border: none;
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
    position: relative;
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
    line-height: 12px;
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

  .food-item .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
</style>
