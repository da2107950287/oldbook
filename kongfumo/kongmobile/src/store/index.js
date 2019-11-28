import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 添加到购物车的商品列表
        added: [],
        collect:[],
        definecolor:"black",
        flag:false
    },
    mutations: { //this.store.commit('function',xx)
        addCollect(state,bid){
            // Vue.set(collectObj,"color","red");
            if(state.flag){
                state.definecolor="black";
                state.flag=false;
            }else{
                state.definecolor="red";
                state.flag=true;
            }
            state.collect.push(bid);
           
        },
        addTocart(state, goodsinfo) {
            var flag = false; //假设没有新加入的商品
            // 重复的商品，就只是做count++；
            state.added.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count++;
                        flag = true;
                        return true;
                    }
                })
                // 没有新加入的商品
            if (!flag) {
                Vue.set(goodsinfo, 'count', 1);
                state.added.push(goodsinfo);
            }

        },
        // 删除 单个
        delectGoods(state, id) {
            state.added.some((item, index) => {
                if (item.id == id) {
                    state.added.splice(index, 1);                  
                }
            })
            localStorage.setItem('shops',JSON.stringify(state.added));   
        },
        // 批量商品删除 
        delectGoodsAll(state, arrid) {

            // console.log(arrid.$data.checkedshop.toString().split(''))
console.log(arrid)
            for (var i = 0; i < arrid.length; i++) {
                state.added.some((item, index) => {
                    if (arrid[i] == item.id) {
                        state.added.splice(index, 1);
                       
                    }

                })
            }
            localStorage.setItem('shops',JSON.stringify(state.added));
        },
        // count 数量的增加
        addCount(state, id) {
            console.log(state.added)
            state.added.forEach(item => {
                if (id == item.id) { item.count++; }
            })
            localStorage.setItem('shops',JSON.stringify(state.added));
        },
        // count 点击数量减少
        delCount(state, id) {
            state.added.forEach(item => {
                if (id == item.id) {
                    if (item.count <= 1) { item.count = 1; } else { item.count--; }
                }

            })
            localStorage.setItem('shops',JSON.stringify(state.added));
        }
    },
    actions: {

    },
    getters: { //this.$store.getters.xx
        shop_list: state => state.shop_list,
        // 返回总商品数量
        getAllCount(state) {
            var sum = 0;
            state.added.forEach(item => {
                sum += item.count;
            })
            return sum;
        },
        // 返回总购物车的价格
        getAllPrice(state) {
            var allprice = 0;
            state.added.forEach(item => {
                allprice += (item.price * item.count);
            })
            return allprice.toFixed(2);
        },
        // 传入这个商品的id，返回单个商品的总的金额：数量*单价
        getPrice(state, id) {
            var price = 0;
            state.added.forEach(item => {
                if (id == item.id) { price += (item.price * item.count); }

            })
            return price;
        }

    }
})
