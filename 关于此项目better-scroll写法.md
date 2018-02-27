# dom
老师写法`<div class="menu-wrapper" v-el:menu-wrapper>`
应该改为`<div class="menu-wrapper" ref="menuWrapper">`

# js
老师写法`this.menuScroll = new BScroll(this.$els.menuWrapper, {})`
应该改为`this.menuScroll = new BScroll(this.$refs.menuWrapper, {})`