// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO employees(name,id,province,sex,enter_date,department) VALUES(?,?,?,?,?,?)'
			connection.query($sql.insert, [param.work_num,param.name, param.id,param.province,param.sex, param.enter_date,param.department,param.contact], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'操作成功'
					};    
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = req.query.id;
			connection.query($sql.delete, [id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'操作成功'
					};    
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.query || req.params;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'操作成功'
					};    
				}
				jsonWrite(res, result);
				connection.release();
			});
		});

	},
	leave: function (req, res, next) {
		var param = req.query || req.params;
		if(param.id == null || param.leave_date == null) {
			jsonWrite(res, undefined);
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.leave, [param.leave_date,param.id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'操作成功'
					};    
				}
				jsonWrite(res, result);
				connection.release();
			});
		});

	},
	queryById: function (req, res, next) {
		var id = req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	query_col_name: function (req, res, next) {
		var table_name = req.query.table_name; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.query_col_name, [table_name], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	department_groupby: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.department_groupby, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	get_similar_warehouse_record: function (req, res, next) {
		var param = req.query || req.params;
		if(param.material_name == null) {
			jsonWrite(res, undefined);
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.get_similar_warehouse_record, [param.material_name], function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},

};