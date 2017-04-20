<template>
    <section>
        <!--工具条-->
        <Row>
            <Col span="24" class="toolbar">
            <Form :model="filters" inline>
                <Form-item>
                    <Input v-model="filters.name" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="getlist">查询</Button>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleAdd">添加入库单</Button>
                </Form-item>
                <Form-item>
                    <Button type="success" :disabled="this.sels.length===0">入库确认</Button>
                </Form-item>
    
            </Form>
            </Col>
        </Row>
    
        <!--列表-->
        <Row>
            <Col span="24">
            <Table :columns="columns1" highlight-current-row :data="list" @on-selection-change="selsChange" @on-row-click="rowClick"></Table>
            <div class="toolbar">
                <Button type="error" @click="batchRemove" :disabled="this.sels.length===0"><Icon type="trash-a"></Icon>批量删除</Button>
                <Page @on-change="handleCurrentChange" :total="total" style="float:right;" show-sizer></Page>
            </div>
    
            <br>
            <i-table :columns="columnsaddForm" :data="addFormdata" highlight-current-row></i-table>
            </Col>
        </Row>
        <!--工具条-->
        <!--<Row>
            <Col span="24" class="toolbar">
           
            </Col>
        </Row>-->
        <!--编辑界面-->
        <!-- <Modal v-model="editFormVisible" title="编辑" width="1000">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
    
            </Form>
        </Modal> -->
        <!--新增界面-->
        <Modal v-model="addFormVisible" title="添加入库单" width="1200" class-name="vertical-center-modal" @on-ok="add">
            <Row>
                <Col span="24" class="toolbar">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
                    <Form-item label="业务类型">
                        <Select v-model="formInline.select1" style="width:200px">
    			 <Option v-for="item in yewu_options" :value="item.value" :key="item">{{ item.label }}</Option>
    	 </Select>
                    </Form-item>
                    <Form-item label="入库类型">
                        <Select v-model="formInline.select2" style="width:200px">
    			 <Option v-for="ruku in ruku_options" :value="ruku.value" :key="ruku">{{ ruku.label }}</Option>
    	 </Select>
                    </Form-item>
                
                    <Form-item>
                        <Input v-model="formInline.ruku_beizhu" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="入库备注"></Input>
                    </Form-item>
                </Form>
                </Col>
    
            </Row>
            <Row>
                <Col span="5">
                <Input v-model="SaoMa" placeholder="扫码入库" style="width: 300px;margin-bottom: 10px;"></Input>{{ addFormdata }}
                </Col>
            </Row>
            <i-table :columns="columnsaddForm" :data="addtable" highlight-current-row></i-table>
    
        </Modal>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {
        getUserListPage,
        removeUser,
        batchRemoveUser,
        editUser,
        addUser
    } from '../../api/api';
    import lodash from 'lodash'
    export default {
        data() {
            return {
                total_num: 0,
                answer: [],
                SaoMa: '',
                list:[],
                columns1: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '入库状态',
                    key: 'state_stock_in',
                    render(row) {
                        const color = row.state_stock_in == '未审核' ? 'blue' : row.state_stock_in == '已审核' ? 'green' : 'red';
                        const text = row.state_stock_in == '未审核' ? '未审核' : row.state_stock_in == '已审核' ? '已审核' : '审核失败';
                        return `<tag type="dot" color="${color}">${text}</tag>`;
                    }
                }, {
                    title: '业务类型',
                    key: 'remarks'
                }, {
                    title: '入库类型',
                    key: 'remarks'
                }, {
                    title: '入库单号',
                    key: 'no_stork_in_list'
                }, {
                    title: '制单员',
                    key: 'remarks'
                }, {
                    title: '入库数量',
                    key: 'num_stock_in'
                }, {
                    title: '入库时间',
                    key: 'time_stock_in'
                }],
                addFormdata: [{
                    name: '合计',
                    bianhao: '',
                    guige: '',
                    chima: '',
                    yanse: '',
                    fenlei: '',
                    tiaoxinma: '',
                    jinhuo_price: '',
                    ruku_num: this.total_num,
                    yewu_leixing: '',
                    kucun: ''
                }],
                addtable:[],
                columnsaddForm: [{
                        type: 'index',
                        width: 60,
                        align: 'center',
    
    
                    }, {
                        title: '品牌',
                        key: 'brand',
    
                    }, {
                        title: '产品编号',
                        key: 'bianhao'
                    }, {
                        title: '规格',
                        key: 'guige'
                    }, {
                        title: '尺码',
                        key: 'chima'
                    }, {
                        title: '颜色',
                        key: 'yanse'
                    }, {
                        title: '产品分类',
                        key: 'fenlei'
                    }, {
                        title: '条形码',
                        key: 'bar_code'
                    }, {
                        title: '进货价',
                        key: 'jinhuo_price'
                    }, {
                        title: '入库数量',
                        key: 'num'
                    }, {
                        title: '业务类型',
                        key: 'yewu_leixing'
                    }, {
                        title: '库存',
                        key: 'kucun'
                    }
    
                ],
                formInline: {
                    ruku_beizhu: '',
                    rukudanhao: '',
                    select1: '',
                    select2: ''
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 6,
                        message: '密码长度不能小于6位',
                        trigger: 'blur'
                    }]
                },
    
                yewu_options: [{
                    value: 'all',
                    label: '全部'
                }, {
                    value: 'caigou',
                    label: '采购入库'
                }, {
                    value: 'other',
                    label: '其他入库'
                }],
                ruku_options: [{
                    value: 'all',
                    label: '全部'
                }, {
                    value: 'caigou',
                    label: '采购入库'
                }, {
                    value: 'zhengchang',
                    label: '正常入库'
                }],
                filters: {
                    name: ''
                },
                users: [],
                total: 40,
                page: 1,
                listLoading: false,
                sels: [], //列表选中列
    
                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    pinpai: '',
                    guige: '',
                    pic: '',
                },
    
                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{
                        required: true,
                        message: '请输入品名',
                        trigger: 'blur'
                    }],
                    pinpai: [{
                        required: true,
                        message: '请输入品牌',
                        trigger: 'blur'
                    }]
                },
            }
        },
        watch: {
            // 如果 question 发生改变，这个函数就会运行
            SaoMa: function(newQuestion, old) {
                // console.log('new'+newQuestion);
                // console.log('old'+old);
    
                if (newQuestion == "") {
                    return
                }
                this.senDsaoma()
    
    
    
            }
        },
        methods: {
            rowClick(row) {
                console.log(row)
            },
            
            senDsaoma: _.debounce(function(news,old) {
    // this.addFormdata.unshift(pushData)
    // console.log( this.addFormdata)
// var pushData = [{name: '品牌',bianhao: '0909090',guige: 'kjk',chima: '213123',yanse: '123123', fenlei: 'sd',tiaoxinma:_this.SaoMa,jinhuo_price: 'jinhuo',
//                         ruku_num: 1,
//                         yewu_leixing: 'kjs',
//                         kucun: 'cku'
//                     }]

this.answer = [{data_list:this.addtable,handle:'get',new_add:this.SaoMa}]
                     this.$http.post('http://admin.a10store.com/bin/api/wharehouse/wharehouse.stock.in.add.php',this.answer).then(response => {
                    console.log(response);
                    this.addtable = response.body.data_list
                     this.SaoMa = ''
                }, response => {
                    // error callback
                });
    
                    // this.SaoMa = ''
                },
                // 这是我们为用户停止输入等待的毫秒数
                500
            ),
            add(){
                console.log(this.answer)
               this.answer = [{data_list:this.addtable,handle:'in'}]
                 this.$http.post('http://admin.a10store.com/bin/api/wharehouse/wharehouse.stock.in.add.php',this.answer).then(response => {
                    console.log(response);
                }, response => {
                    // error callback
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit() {
                console.log('submit!');
            },
            //性别显示转换
            formatSex: function(row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取已有入库单列表
            getlist() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                // GET /someUrl
                this.$http.get('http://admin.a10store.com/bin/api/wharehouse/wharehouse.stock.in.list.get.php').then(response => {
                    console.log('no');
                    this.list = response.body
                }, response => {
                    // error callback
                });
    
                console.log(para);
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    console.log(this.users);
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {
                        id: row.id
                    };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getlist();
                    });
                }).catch(() => {
    
                });
            },
            //显示编辑界面
            handleEdit: function(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function() {
                var cars = ["BMW", "Volvo", "Saab", "Ford", "Ford"];
                this.addFormVisible = true;
                this.formInline = {
                    ruku_beizhu: '',
                    select1: '',
                    select2: ''
                };
                //get api for 寻找已有编号长度
    
    
            },
            //编辑
            editSubmit: function() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getlist();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            console.log(this);
                            console.log(para);
                            this.$refs.upload.submit();
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function() {
                // var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {
                        ids: ids
                    };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {
    
                });
            }
        },
        mounted() {
           this.getlist()
            // this.getUsers();
        }
    }
</script>

<style scoped>
    table {
        width: 100%!important
    }
    
    .ivu-table-fixed,
    .ivu-table-fixed-right {
        bottom: 0
    }
    
    .toolbar {
        background: #f2f2f2;
        padding: 10px;
        margin: 10px 0px;
    }
    .ivu-icon{
        margin-right: 5px;
    }
</style>

<!---->