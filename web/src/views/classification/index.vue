<template>
  <div>
    <div class="index-search">
      <van-search
        shape="round"
        disabled
        background="#fff"
        placeholder="搜索商品"
        @click="toSearch"
      />
    </div>
    <div class="classify-content">
      <van-tree-select height="89vh" :items="items" :active-id.sync="items.activeId" :main-active-index.sync="active" @click-nav="onNavClick">
        <template #content>
          <div class="right-content">
            <img :src="currentImg" alt="" width="100%" @click="toGoodsList(currentId)">
            <div v-for="(item,index) in subCategary" :key="index" class="sub-categary">
              <div class="sub-name" @click="toGoodsList(item.id)">{{ item.category_name }}</div>
              <div class="sub-child">
                <ul>
                  <li v-for="(child,i) in item.children" :key="i" @click="toGoodsList(child.id)">
                    <img :src="child.logo" alt="">
                    <p>{{ child.category_name }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      currentId: 0,
      currentImg: '',
      items: [],
      categories: [],
      subCategary: []
    }
  },
  created() {
    this.currentId = this.$route.query.category_id
    this.getCategoryList()
  },
  methods: {
    onNavClick(e) {
      Object.assign(this.$route.query, { category_id: this.items[e].activeId })
      this.currentId = this.items[e].activeId
      this.currentImg = this.items[e].image_path
      this.subCategary = this.categories[e].children
    },
    // 获取分类列表
    getCategoryList() {
      // categoryApi.getCategory().then(res => {
      //   // 渲染左侧列表
      //   res.data.map(item => {
      //     this.items.push({
      //       activeId: item.id,
      //       text: item.category_name,
      //       image_path: item.image_path
      //     })
      //   })
      //   if (this.currentId) {
      //     res.data.forEach((element, i) => {
      //       if (element.id === parseInt(this.currentId)) {
      //         this.active = i
      //         this.currentImg = res.data[i].image_path
      //         this.subCategary = res.data[i].children
      //       }
      //     })
      //   } else {
      //     this.currentId = res.data[0].id
      //     this.currentImg = res.data[0].image_path
      //     this.subCategary = res.data[0].children
      //   }
      //   this.categories = res.data
      // })
    },
    toSearch() {
      this.$router.push({ path: `/goodsList` })
    },
    toGoodsList(id) {
      this.$router.push({ path: `/goodsList?category_id=${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.classify-content{
 .right-content{
   padding: 0 10px;
    img{
      width: 100%;
      height: 110px;
      border-radius: 5px;
    }
    .sub-categary{
      padding: 5px 0;
      .sub-name{
        padding: 8px 0;
        color: #333;
        font-size: 14px;
      }
      .sub-child{
        ul{
          display: flex;
          align-items: center;
          flex-flow: wrap;
          li{
            width: 25%;
            margin-right: 12%;
            img{
              width: 100%;
              height: 58px;
            }
            p{
              margin: 2px 0;
              font-size: 12px;
              text-align: center;
            }
          }
          li:nth-child(3n){
              margin: 0;
            }
        }
      }
    }
  }
}

</style>
