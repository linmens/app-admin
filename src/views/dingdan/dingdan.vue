<template>
<Form :model="formItem" :label-width="80">
    <Row>
        <Col span="12">
        <Form-item label="商品ID">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="宝贝名称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="订单编号">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="买家昵称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="订单状态">
            <Select v-model="formItem.select" placeholder="请选择">                                                                        <Option value="beijing">北京市</Option>                                                                        <Option value="shanghai">上海市</Option>                                                                        <Option value="shenzhen">深圳市</Option>                                                                    </Select> </Form-item>
        <Form-item label="成交时间">
            <Row>
                <Col span="11">
                <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                 <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
            </Row>
        </Form-item>
        </Col>
    </Row>
    <Form-item>
        <Button type="primary">查询</Button> </Form-item>
    <Row>
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
        <Menu mode="horizontal" theme="light" active-name="1">
        <Menu-item name="1">
            全部
        </Menu-item>
        <Menu-item name="2">
            待付款
        </Menu-item>
        <Menu-item name="4">
            待发货
        </Menu-item>
         <Menu-item name="4">
            退款中
        </Menu-item>
    </Menu>
<br>
 <Card shadow class="orderCard" v-for="order in checkLen(orders)">
         <Row slot="title" type="flex" justify="space-between" class="">
        <Col span="6"><Icon type="happy-outline"></Icon> {{order.buyer}}</Col>
        <Col span="6" class="toright fuzhu">订单编号: {{order.order_iid}}  | <span style="color:#ff9900">{{order.status}}</span></Col>
    </Row>
     <Row type="flex" justify="space-between" class="orderGoods" v-for="g in order.goods" >
        <Col span="4" class="img-border"><img :src="g.img" width="50" height="50"></Col>
        <Col span="4" class="">
{{g.title}}
<p class="fuzhu">颜色分类:{{g.color}};尺码:{{g.size}}</p>
 </Col>
        <Col span="4" class="toright zhuyao"><Icon type="social-yen"></Icon> {{g.price}}
        <p>{{g.num}}</p>
        </Col> 
    </Row>
     

    {{order.goods.length}}
     <Row type="flex" justify="center" class="Textcenter orderGoods" v-show="order.goods.length!=1">
        <Col span="24" style="cursor:pointer"><span  @click="showMore(order)" v-if="!order.Hide">显示更多</span>
        <span  @click="showMore(order)" v-if="order.Hide">收起更多</span>
       
        </Col>
    </Row>
    <Row type="flex" justify="end" class="toright orderGoods">
        <Col span="4">共<span class="zhuyao">{{order.total_num}}</span>件商品</Col>
        <Col span="4" >实收款:<span class="zhuyao">{{order.total_price}}</span></Col>
    </Row>
    <Row type="flex" justify="space-between" class="bottom-button">
        <Col span="11">手动发货</Col>
        <Col span="2" style="opacity: 0.5;">|</Col>
        <Col span="11">查看详情</Col>
    </Row>
</Card>
    
        </Col>
    </Row>
</Form>
</template><script>
export default {
    data() {
        return {
            showButton:'显示更多',
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            },
            columns4: [{
                title: '宝贝',
                key: 'goods',
                width: '35%',
                render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    <Row type="flex" justify="start" class="rB">
                    <i-col span="4"><img src="1.png" width="50" height="50"></i-col>
                    <i-col span="20">依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005
                    <br>
                    <span>颜色分类：紫色尺码：Lw</span>
                    <br>
                    <span>商家编码：Y6B014849803</span>
                    </i-col>
                    
                               </Row>`;
                }
            }, {
                title: '单价',
                key: 'price',
                   render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    `
                }
            }, {
                title: '数量',
                key: 'num',
                render(row, column, index) {
                    return `
                    <Row type="flex" justify="space-between" class="rH">
                    <i-col span="12">订单编号:656565656565656565</i-col>
                    <i-col span="12">成交时间:20187</i-col>
                    </Row>
                    `
                }
            }, {
                title: '售后',
                key: 'shouhou'
            }, {
                title: '买家',
                key: 'buyer'
            }, {
                title: '交易状态',
                key: 'status'
            }, {
                title: '实收款',
                key: 'all'
            }],
            orders: [
                {
                buyer: '只有一个产品',
                order_iid: 656565656565656565,
                status: '未发货',
                goods: [{
                    img:'https://img.alicdn.com/bao/uploaded/i2/2002028931/TB2VIQruXXXXXbNXXXXXXXXXXXX_!!2002028931.jpg',
                    title:'依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005 ',
                    color:'粉色',
                    size:'L',
                    price:'150',
                    num:'1'
                }
                ],
                total_price:'544',
                total_num:'4',
            }, {
                buyer: '王小明',
                order_iid: 656565656565656565,
                status: '未发货',
                goods: [{
                    img:'https://img.alicdn.com/bao/uploaded/i2/2002028931/TB2VIQruXXXXXbNXXXXXXXXXXXX_!!2002028931.jpg',
                    title:'依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005 ',
                    color:'粉色',
                    size:'L',
                    price:'150',
                    num:'1'
                },
                {
                    img:'https://img.alicdn.com/bao/uploaded/i2/2002028931/TB2VIQruXXXXXbNXXXXXXXXXXXX_!!2002028931.jpg',
                    title:'依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005 ',
                    color:'粉色',
                    size:'M',
                    price:'150',
                    num:'1'
                }
                ],
                total_price:'544',
                total_num:'4',
                Hide:false,
               
            }, 
            {
                buyer: '王da明',
                order_iid: 656565656565656565,
                status: '已发货',
                goods: [{
                    img:'https://img.alicdn.com/bao/uploaded/i2/2002028931/TB2VIQruXXXXXbNXXXXXXXXXXXX_!!2002028931.jpg',
                    title:'依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005 ',
                    color:'粉色',
                    size:'L',
                    price:'150',
                    num:'1'
                },
                {
                    img:'https://img.alicdn.com/bao/uploaded/i2/2002028931/TB2VIQruXXXXXbNXXXXXXXXXXXX_!!2002028931.jpg',
                    title:'依布2016秋季新品中老年女装妈妈装花色套头针织衫打底衫y15a005 ',
                    color:'粉色',
                    size:'M',
                    price:'150',
                    num:'1'
                }
                ],
                total_price:'544',
                total_num:'4',
                Hide:false
            }],
            
        }
    },
    methods:{
                showMore(e){
                    console.log(e)
                    e.Hide = !e.Hide
                },
                checkLen: function (orders) {
                     console.log(orders.goods)

}
               
            }
}
</script><style>

.ivu-card-body{
    padding:0!important
}
.bottom-button{
     padding:10px;
     background:#f5f7f9
}
.bottom-button .ivu-col{
    text-align:center;
    cursor:pointer
   
}

.img-border img{
    border:1px solid #d7dde4
}
.Textcenter{
    text-align:center
}
.zhuyao{
    color:#464c5b;
    font-weight:800;
}
.fuzhu{
    color:#9ea7b4;
    font-size:12px
}
.orderCard{
    margin-bottom:10px;
 border-radius:0px!important
}
.orderGoods{
  
    padding:10px;
    border-bottom:1px solid #e3e8ee
}
.rH{
    background:#3399ff;
    margin-top:10px;
    color:white;
    padding:10px
}
.rB{
    padding:10px
}
.toright{
    text-align: right;
}
.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
    height: 100%;
    margin-top: -16px;
}

.tableHead {
    padding: 10px;
    margin-top: 5px;
    background: #3399ff;
    color: white
}

.code-row-bg {
    background: #e3e8ee;
    padding: 10px
}

.demo-tabs-style1 {
    background: #f5f7f9;
    padding: 16px;
}

.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
}
</style>
