[为什么是ref](http://blog.csdn.net/jackxiaochen/article/details/78034658)
# dom
老师写法`<div class="menu-wrapper" v-el:menu-wrapper>`
应该改为`<div class="menu-wrapper" ref="menuWrapper">`

# js
老师写法`this.menuScroll = new BScroll(this.$els.menuWrapper, {})`
应该改为`this.menuScroll = new BScroll(this.$refs.menuWrapper, {})`

# 两边滚动相连
老师写法`<li v-for="item in goods" class="menu-item"
            :class="{'current':currentIndex===$index}">`
应该改为`<li v-for="(item,index) in goods" class="menu-item"
            :class="{'current':currentIndex===index}">`
			
# 点击左侧菜单，右侧跳到相应地方
老师写法
```
    let foodList = this.foodsWrapper.getElementsByClassName('food-list-hook')
    let el = foodList[index]
    this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
```
应该改为`this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)`