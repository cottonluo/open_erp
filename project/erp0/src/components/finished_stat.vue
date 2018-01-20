<style scoped>
.layout {
    height: 100%;
    width: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
}

.layout-assistant {
    width: 100%;
    margin: 0 auto;
    height: inherit;
    position: relative;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    height: 100%;
    margin: 5px;
    /* overflow: hidden; */
    background: #fff;
    border-radius: 4px;
}
.ivu-select-dropdown{
    width: 300px !important;
}
.layout-content-main {
    padding: 10px;
}

.layout-copy {
    bottom: 0;
    height: 5%;
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

input {
    width: 100%;
}

table {
    width: 100%;
}
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="1">
                    <Icon type="ios-navigate"></Icon>
                    导航一
                </Menu-item>
                <Menu-item name="2">
                    <Icon type="ios-keypad"></Icon>
                    导航二
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="ios-analytics"></Icon>
                    导航三
                </Menu-item>
                <Menu-item name="4">
                    <Icon type="ios-paper"></Icon>
                    导航四
                </Menu-item>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="1">
            <div class="layout-assistant">
                <Menu-item name="1">仓库出入料</Menu-item>
                <Menu-item name="2">成品统计</Menu-item>
                <Menu-item name="3">半成品统计</Menu-item>
            </div>
        </Menu>
        <!-- <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="#">首页</Breadcrumb-item>
                <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                <Breadcrumb-item>某应用</Breadcrumb-item>
            </Breadcrumb>
        </div> -->
        <div class="layout-content">
            <table>
                <thead>
                    <tr>
                        <!--<!--<th v-for="(name,index) in col_name">{{name.COLUMN_NAME}}</th>-->
                        <th>出入库时间</th>
                        <th style="width:4%">出入库行为</th>
                        <th>供应商名</th>
                        <th>物流编码</th>
                        <th>物料名称</th>
                        <th style="width:6%">规格</th>
                        <th style="width:4%">颜色</th>
                        <th style="width:4%">单位</th>
                        <th style="width:8%">数量</th>
                        <th style="width:4%">位置</th>
                        <th style="width:4%">加工程度</th>
                        <th>备注</th>
                        <th>使用人</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(row,index) in new_row" :key="index">
        					<td>{{ row.enter_date}}</td>
        					<td>{{ row.vendor }}</td>
        					<td>{{ row.material_id }}</td>
        					<td>{{ row.material_name }}</td>
        					<td>{{ row.size }}</td>
        					<td>{{ row.color }}</td>
        					<td>{{ row.unit }}</td>
        					<td>{{ row.count }}</td>
        					<td>{{ row.storage }}</td>
        					<td>{{ row.process_level }}</td>
        					<td>{{ row.notes }}</td>
        					<td :class="'text-center'">
        						<button @click="add_row()">添加新物料</button>
        					</td>
        				</tr>                  -->
                    <tr v-for="(row,index) in rows" :key="index">
                        <td>
                            <!-- <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width:100%"></DatePicker> -->
                            <input type="text" v-model="row.enter_date" />
                        </td>
                        <td >
                            <Select v-model="row.activitives" style="color:green">
                                <Option value="进库" style="color:green">进库</Option>
                                <Option value="出库" style="color:red">出库</Option>
                            </Select>
                        </td>
                        <td>
                            <input type="text" v-model="row.vendor" />
                        </td>
                        <td>
                            <input type="text" v-model="row.material_id" />
                        </td>
                        <td style="padding:3px">
                            <!-- <input type="text" v-model="row.material_name" /> -->
                            <Select placeholder="填入物料自动搜索" filterable remote :remote-method="remoteMethod" :loading="loading" @on-change="v=>{fillRow(v)}" >
                                <Option v-for="option in options" :value="option.value" :key="option.label" :ma="option.ma" :co="option.co">{{option.label}},{{option.ma}},{{option.co}}</Option>
                            </Select>
                        </td>
                        <td>
                            <input type="text" v-model="row.size" />
                        </td>
                        <td>
                            <input type="text" v-model="row.color" />
                        </td>
                        <td>
                            <input type="text" v-model="row.unit" />
                        </td>
                        <td>
                            <input type="text" v-model="row.count" placeholder="出库填-进库填+" />
                        </td>
                        <td>
                            <input type="text" v-model="row.location" />
                        </td>
                        <td>
                            <input type="text" v-model="row.process_level" />
                        </td>
                        <td>
                            <input type="text" v-model="row.notes" />
                        </td>
                        <td>
                            <input type="text" v-model="row.user" />
                        </td>
                        <!-- <td :class="'text-center'" width="65px">
                            <Button type="primary" @click="add_row()">添加新行</Button>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin:0 auto">
                <Button type="ghost" style="width:100%" @click="add_row()">添加新行</Button>
                <Button type="success" style="width:100%" @click="delete_row()">删除新行</Button>
                <Button type="primary" style="width:100%" @click="insert_warehouse_records()">确认提交数据到服务器</Button>
        </div>
        <div class="layout-copy">
            佛山市好意乐玩具有限公司
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import echarts from 'echarts'
import debounce from '@/components/deBounce'
function get_date_in_format() {
    var date = new Date();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var nowDay = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day)+" "+(hour < 10 ? "0" + hour : hour)+":"+(min < 10 ? "0" + min : min)+":"+(sec < 10 ? "0" + sec : sec);
    console.log(nowDay.toString());
    return nowDay.toString();
}
export default {
    data() {
        return {
            rows: [{
                id:'',
                enter_date: get_date_in_format(),
                activitives: '',
                vendor: '',
                material_id: '',
                material_name: '',
                size: '',
                color: '',
                unit: '',
                count: '',
                location: '',
                process_level: '',
                notes: '',
                user:'',
            }],
            initial_rows: [{
                id:'',
                enter_date: get_date_in_format(),
                activitives: '',
                vendor: '',
                material_id: '',
                material_name: '',
                size: '',
                color: '',
                unit: '',
                count: '',
                location: '',
                process_level: '',
                notes: '',
                user:'',
            }],
            model: '',
            loading: false,
            list:[],
            // list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
            options: []
        }
    },
    methods: {
        add_row: function () {
            this.rows.push({
                enter_date: get_date_in_format(),
                activitives: '',
                vendor: '',
                material_id: '',
                material_name: '',
                size: '',
                color: '',
                unit: '',
                count: '',
                location: '',
                process_level: '',
                notes: '',
                user:''
            });
            console.log(this.new_row)
        },
        delete_row: function () {
            this.rows.pop();
        },
        fillRow: function(str){
            var json_content=new Array()
            json_content=JSON.parse(str)
            json_content.enter_date=get_date_in_format()
            console.log(json_content);
            this.rows.unshift(json_content)
            this.list=[]
            this.options=[]
        },
        remoteMethod: debounce(function (query) {
            if (query !== '') {
                this.loading = true;
                axios.get('http://localhost:8888/get_similar_warehouse_record', {
                    params: {
                        material_name:query
                    }
                })
                    .then((response) => {
                        console.log(response.data.data)
                        this.list=response.data.data;
                    })
                    .catch(function (error) {
                        alert("数据库没有类似记录");
                    });
                setTimeout(() => {
                    this.loading = false;
                    const alist = this.list.map(item => {
                        return {
                            value: JSON.stringify(item),
                            // label: item.data[0].vendor+" , "+item.data[0].material_name,
                            label: item.vendor,
                            ma:item.material_name,
                            co:item.color
                            
                        };
                    });
                        for(var i=0,len=alist.length; i<len; i++){
                            this.options.push(alist[i])
                        }
            
                }, 200);
            } else {
                this.options = [];
                this.list = [];
            }
        },400),
        insert_warehouse_records: function () {
                axios.get('http://localhost:8888/insert_records_warehouse_record', {
                    params: {table:"warehouse_record",
                    content:JSON.stringify(this.rows)}
                })
                    .then((response) => {
                        this.rows = this.initial_rows;
                        //			    	alert(response.status);
                    })
                    .catch(function (error) {
                        alert(error);
                    });
        },
    }
}
</script>