<template>
	<div>
		<div class='main'>
			<div class='function'>
				<legend>
					好意乐玩具有限公司-员工录入表
				</legend>
				<div class="form-group">
					<label>名字:</label>
					<input type="text" v-model="newPerson.name" />
				</div>
				<div class="form-group">
					<label>省份:</label>
					<select v-model="newPerson.province">
						<option value="广东省">广东省</option>
						<option value="广西省">广西省</option>
						<option value="河北省">河北省</option>
						<option value="河南省">河南省</option>
						<option value="江苏省">江苏省</option>
						<option value="江西省">江西省</option>
						<option value="湖南省">湖南省</option>
						<option value="湖北省">湖北省</option>
						<option value="福建省">福建省</option>
						<option value="北京市">北京市</option>
						<option value="甘肃省">甘肃省</option>
						<option value="陕西省">陕西省</option>
						<option value="山西省">山西省</option>
						<option value="上海市">上海市</option>
						<option value="重庆市">重庆市</option>
						<option value="黑龙江省">黑龙江省</option>
						<option value="辽宁省">辽宁省</option>
						<option value="吉林省">吉林省</option>
						<option value="新疆省">新疆省</option>
						<option value="西藏省">西藏省</option>v
					</select>
				</div>
				<div class="form-group">
					<label>身份证号:</label>
					<input type="text" v-model="newPerson.id" />
				</div>
				<div class="form-group">
					<label>联系电话(纯数字):</label>
					<input type="text" v-model="newPerson.contact" />
				</div>
				<div class="form-group">
					<label>性别:</label>
					<select v-model="newPerson.sex">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div>
				<div class="form-group">
					<label>部门:</label>
					<select v-model="newPerson.department">
						<option value="市场部">市场部</option>
						<option value="制衣部">制衣部</option>
						<option value="包装部">包装部</option>
						<option value="喷漆部">喷漆部</option>
						<option value="搪胶部">搪胶部</option>
						<option value="行政部">行政部</option>
						<option value="后勤部">后勤部</option>
						<option value="后勤部">运输部</option>
						<option value="其他部门">临时部门</option>
					</select>
				</div>
				<div class="form-group">
					<label>岗位:</label>
					<select v-model="newPerson.position">
						<option value="主管">经理</option>
						<option value="销售">销售</option>
						<option value="主管">主管</option>
						<option value="组长">组长</option>
						<option value="普工">普工</option>
						<option value="普工">搪胶</option>
						<option value="普工">喷漆</option>
						<option value="普工">司机</option>
						<option value="普工">保洁</option>
						<option value="普工">保安</option>
						<option value="外包">外包</option>
						<option value="外包">暑期</option>
					</select>
				</div>
				<div class="form-group">
					<label>宿舍床号:</label>
					<input type="text" v-model="newPerson.bed_num" />
					</select>
				</div>
				<div class="form-group">
					<label></label>
					<button @click="createPerson">创建员工到列表</button>
					<button @click="searchPerson(newPerson.id)">搜索员工（多位身份证号码）</button>
					<button @click="showallPerson()">显示所有员工</button>
				</div>
			</div>
			<div class='tongji' id='myChart'>
				<legend>
					tongji
				</legend>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<!--<!--<th v-for="(name,index) in col_name">{{name.COLUMN_NAME}}</th>-->
					<th>工号</th>
					<th>名字</th>
					<th>年龄</th>
					<th>身份证号</th>
					<th>联系电话</th>
					<th>性别</th>
					<th>省份</th>
					<th>入职时间</th>
					<th>离职时间</th>
					<th>部门</th>
					<th>岗位</th>
					<th>床号</th>
					<th>管理功能</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(person,index) in people" :key="person">
					<td>{{ person.work_num}}</td>
					<td>{{ person.name }}</td>
					<td>{{ person.age }}</td>
					<td>{{ person.id }}</td>
					<td>{{ person.contact }}</td>
					<td>{{ person.sex }}</td>
					<td>{{ person.province }}</td>
					<td>{{ person.enter_date }}</td>
					<td>{{ person.leave_date }}</td>
					<td>{{ person.department }}</td>
					<td>{{ person.position }}</td>
					<td>{{ person.bed_num }}</td>
					<td :class="'text-center'">
						<button @click="deletePerson_from_page(index)">列表中去除</button>
						<button @click="deletePerson_from_database(person.id)">数据库中去除</button>
						<button @click="enter(person.id)">入职</button>
						<button @click="leave(person.id)">离职</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
	<!--<script src="/javascripts/vue.js"></script>
	<script src="/javascripts/axios.js"></script>-->
	<!--<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>-->
	<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
<script>
import Vue from 'vue'
import axios from 'axios'
import echarts from 'echarts'
function get_date_in_format() {
	var date = new Date();
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var nowDay = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
	console.log(nowDay.toString());
	return nowDay.toString();
}
export default {
	data() {
		return {
			newPerson: {
				name: '',
				id: '',
				province: '',
				sex: '',
				enter_date: get_date_in_format(),
				department: '',
				contact: '',
				work_num: '',
				position: '',
				bed_num: ''
			},
			people: [],
		}
	},
	methods: {
		createPerson: function () {
			this.people = [];
			this.newPerson.work_num = this.newPerson.contact.substr(-4, 4) + this.newPerson.id.substr(-8, 4);
			this.people.push(this.newPerson);
			// 添加完newPerson对象后，重置newPerson对象
			//                  this.newPerson = {name:"", province: "",id:"", sex: "",enter_date:"",department:""}
		},
		deletePerson_from_page: function (index) {
			// 删一个数组元素
			this.people.splice(index, 1)
		},
		deletePerson_from_database: function (id) {
			axios.get('http://localhost:3000/users/deleteUser', {
				params: {
					"id": id
				}
			})
				.then((response) => {
					this.people = response.data;
					this.people = []
				})
				.catch(function (error) {
					alert("操作失败");
				});
		},
		leave: function (id) {
			axios.get('http://localhost:3000/users/leave', {
				params: {
					"id": id.toString(),
					"leave_date": get_date_in_format()
				}
			})
				.then((response) => {
					this.people = [];
					//			  		this.people=response.data;
					//			    	alert(response.status);
				})
				.catch(function (error) {
					alert("操作失败");
				});
		},
		enter: function (id) {
			if (id.length == 18) {
				//              	axios.get('http://localhost:3000/users/addUser',{params:{"id":id.toString(),"enter_date":get_date_in_format()}})
				console.log(this.newPerson)
				axios.get('http://localhost:3000/users/addUser', {
					params: this.newPerson
				})
					.then((response) => {
						this.people = [];
						//			    	alert(response.status);
					})
					.catch(function (error) {
						alert("操作失败");
					});
			} else {
				alert("必须填写完整18位数字身份证号码");
			}
		},
		searchPerson: function (id) {
			axios.get('http://localhost:3000/users/queryById', {
				params: {
					"id": id
				}
			})
				.then((response) => {
					this.people = response.data;
					//			    	console.log(response);
				})
				.catch(function (error) {
					alert("操作失败");
				});
		},
		showallPerson: function () {
			var r = confirm("确认执行操作？");
			if (r) {
				axios.get('http://localhost:3000/users/queryAll')
					.then((response) => {
						this.people = response.data;
					})
					.catch(function (error) {
						alert("操作失败");
					});
			} else { }
		},
		loadchart: function (chart_title,chart_male_num,chart_female_num,chart_total_num) {
			var myChart = echarts.init(document.getElementById('myChart'));
			// 绘制图表
			myChart.setOption({
				title: { text: '员工部门分布图' },
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['男数','女数','总数']
				},
				xAxis: {
					data: chart_title
				},
				yAxis: {
					type:'value'
				},
				series: [{
					name: '男数',
					type: 'bar',
					stack: '总量',
					label: {
                		normal: {
                    	show: true,
                    	position: 'insideTop'
					}
				},
					data: chart_male_num
				},
				{
					name: '女数',
					type: 'bar',
					stack: '总量',
					label: {
                		normal: {
                    	show: true,
                    	position: 'insideTop'
					}
				},
					data: chart_female_num
				},
				{
					name: '总数',
					type: 'bar',
					stack: '总量',
					label: {
                		normal: {
                    	show: true,
                    	position: 'insideTop'
					}
				},
					data: chart_total_num
				}]
			});
		},
		department_groupby: function () {
			var chart_title=[];
			var chart_male_num=[];
			var chart_female_num=[];
			var chart_total_num=[];
			axios.get('http://localhost:3000/users/department_groupby')
				.then((response) => {
					for(var item in response.data){
							chart_title.push(response.data[item].department)
							chart_male_num.push(response.data[item].male_num);
							chart_female_num.push(response.data[item].female_num);
							chart_total_num.push(response.data[item].total_num);
					}
					this.loadchart(chart_title,chart_male_num,chart_female_num,chart_total_num)
				})
				.catch(function (error) {
					alert("操作失败");
				});
		}

	},
	mounted() {
		this.department_groupby()
	}
}
</script>
<style scoped>
.main {
	height: 300px;
	width: 100%;
	/* border: 1px solid #000; */
	padding: 10px;
	/* display: inline-block; */
	/* overflow:hidden */
}

.function {
	float: left;
	 width: 50%; 
	height: 300px;
	/* display: inline-block; */
	border: 1px solid #000;
}

.tongji {
	float: left;
	width: 45%;
	height: 300px;
	/* padding: 20px; */
	/* display: inline-block; */
	border: 1px solid #000;
	margin-left: 2%;
}
</style>
