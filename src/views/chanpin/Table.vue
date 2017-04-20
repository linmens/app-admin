<template>
    <Row>
    
        <Col span="4">
    
        <Tree :data="baseData" show-checkbox></Tree>
    
        </Col>
    
        <Col span="20">
    
        <Row :gutter="10">
    
            <Col span="6">
    
            <div>
    
                <Button type="primary">添加产品</Button>
    
            </div>
    
            </Col>
    
            <Col span="6">
    
            <Input v-model="value13">
    
            <Select v-model="select3" slot="prepend" style="width: 80px">
    
                <Option value="day">全部</Option>
    
                <Option value="month">产品编号</Option>
    
            </Select>
    
            <Button slot="append" icon="ios-search"></Button>
    
            </Input>
    
            </Col>
    
        </Row>
    
        <Table :columns="columns1" :data="data1" @on-row-click="tochange"></Table>
    
        <br>
    
        <div class="toolbar">
    
            <Page :total="100" show-elevator show-total show-elevator></Page>
    
        </div>
    
        <br>
    
        <div class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
    
            <Tabs type="card">
    
                <Tab-pane label="产品明细">
    
                    <Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
    
                </Tab-pane>
    
                <Tab-pane label="基本信息">
    
                    <Form :model="formItem" :label-width="80">
    
                        <Row :gutter="10">
    
                            <Col span="12">
    
                            <Form-item label="品牌">
    
                                <Select v-model="formItem.select" placeholder="请选择">
    
                    <Option value="beijing">北京市</Option>
    
                    <Option value="shanghai">上海市</Option>
    
                    <Option value="shenzhen">深圳市</Option>
    
                </Select>
    
                            </Form-item>
    
                            </Col>
    
                            <Col span="12">
    
                            <Form-item label="产品编号">
    
                                <Input v-model="formItem.input" placeholder="请输入"></Input>
    
                            </Form-item>
    
                            </Col>
    
                        </Row>
    
                        <Row :gutter="10">
    
                            <Col span="12">
    
    
    
                            <Form-item label="零售价">
    
                                <Input v-model="formItem.input" placeholder="请输入"></Input>
    
                            </Form-item>
    
                            </Form-item>
    
                            </Col>
    
                            <Col span="12">
    
                            <Form-item label="分类">
    
                                <Input v-model="formItem.input" placeholder="请输入"></Input>
    
                            </Form-item>
    
    
    
                            </Col>
    
    
    
                        </Row>
    
                        <Form-item>
    
                            <Button type="primary">保存</Button>
    
                        </Form-item>
    
    
    
                    </Form>
    
                </Tab-pane>
    
            </Tabs>
    
        </div>
    
    
    
        </Col>
    
    </Row>
</template>
<style>
    .ivu-row {
    
        padding-bottom: 10px
    
    }
    
    
    
    .demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
    
        height: 100%;
    
        margin-top: -16px;
    
    }
    
    
    
    .demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
    
        background: #fff;
    
        padding: 16px;
    
    }
    
    
    
    .demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    
        border-color: transparent;
    
    }
    
    
    
    .demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    
        border-color: #fff;
    
    }
</style>
<script>
    export default {
    
        data() {
    
            return {
    
                value13: '',
    
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
    
                baseData: [{
    
                    expand: true,
    
                    title: '分类',
    
                    children: [{
    
                        title: '背心',
    
                        expand: true,
    
                        checked: true,
    
                    }, {
    
                        title: '衬衫',
    
                        expand: true,
    
                        checked: true,
    
                    }]
    
                }],
    
                columns1: [{
    
                    title: '姓名',
    
                    key: 'name'
    
                }, {
    
                    title: '年龄',
    
                    key: 'age'
    
                }, {
    
                    title: '地址',
    
                    key: 'address'
    
                }],
    
                data1: [{
    
                    name: '王小明',
    
                    age: 18,
    
                    address: '北京市朝阳区芍药居'
    
                }, {
    
                    name: '张小刚',
    
                    age: 25,
    
                    address: '北京市海淀区西二旗'
    
                }, {
    
                    name: '李小红',
    
                    age: 30,
    
                    address: '上海市浦东新区世纪大道'
    
                }, {
    
                    name: '周小伟',
    
                    age: 26,
    
                    address: '深圳市南山区深南大道'
    
                }],
    
                select3: 'day',
    
                columns8: [{
    
                    "title": "名称",
    
                    "key": "name",
    
                    "fixed": "left",
    
                    "width": 200
    
                }, {
    
                    "title": "展示",
    
                    "key": "show",
    
                    "width": 150,
    
                    "sortable": true,
    
                    filters: [{
    
                        label: '大于4000',
    
                        value: 1
    
                    }, {
    
                        label: '小于4000',
    
                        value: 2
    
                    }],
    
                    filterMultiple: false,
    
                    filterMethod(value, row) {
    
                        if (value === 1) {
    
                            return row.show > 4000;
    
                        } else if (value === 2) {
    
                            return row.show < 4000;
    
                        }
    
                    }
    
                }, {
    
                    "title": "唤醒",
    
                    "key": "weak",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "登录",
    
                    "key": "signin",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "点击",
    
                    "key": "click",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "激活",
    
                    "key": "active",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "7日留存",
    
                    "key": "day7",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "30日留存",
    
                    "key": "day30",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "次日留存",
    
                    "key": "tomorrow",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "日活跃",
    
                    "key": "day",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "周活跃",
    
                    "key": "week",
    
                    "width": 150,
    
                    "sortable": true
    
                }, {
    
                    "title": "月活跃",
    
                    "key": "month",
    
                    "width": 150,
    
                    "sortable": true
    
                }],
    
                data7: [],
    
            }
    
        },
    
        methods: {
    
            tochange: function(row) {
    
                console.log(this)
    
                this.data7 = [{
    
                    "name": row.name,
    
                    "fav": 0,
    
                    "show": 7302,
    
                    "weak": 5627,
    
                    "signin": 1563,
    
                    "click": 4254,
    
                    "active": 1438,
    
                    "day7": 274,
    
                    "day30": 285,
    
                    "tomorrow": 1727,
    
                    "day": 558,
    
                    "week": 4440,
    
                    "month": 5610
    
                }]
    
            }
    
        }
    
    }
</script>