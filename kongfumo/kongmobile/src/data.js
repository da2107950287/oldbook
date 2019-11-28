export default { 
    sku: {
      // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
      tree: [],
      list: [],
      price: '0.00',
      stock_num: 227, // 商品总库存
      none_sku: false,  // 是否无规格商品 
      hide_stock: false  // 是否隐藏剩余库存
    },
    goods_id: '946755', 
    quota: 3, //限购数量 
    quota_used: 0,  //已经购买过的数量
  
  };
  // let num=new Date().toLocaleDateString()