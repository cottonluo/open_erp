var employees = {
	insert_employees:'INSERT INTO employees(work_num,name,id,province,sex,enter_date,department,contact) VALUES(?,?,?,?,?,?,?,?)',
	update_employees:'update employees set name=?, department=?,enter_date=?,leave_date=?,sex=? where id=?',
	leave_employees:'update employees set leave_date=? where id=?',
	delete_employees: 'delete from employees where id=?',
	queryById_employees: 'select *,year(localtime())-substring(id,7,4) as age from employees where id regexp ?',
	queryAll_employees: 'select *,year(localtime())-substring(id,7,4) as age from employees',
	query_col_name: 'select COLUMN_NAME from information_schema.COLUMNS where table_name = ?',
	department_groupby:"select a.male_num,b.female_num,a.male_num+b.female_num as total_num,a.department from (select count(sex) as male_num,department from employees where sex='男' group by department) a,(select count(sex) as female_num,department from employees where sex='女' group by department) b group by a.department",
	get_similar_warehouse_record: 'select * from warehouse_record where material_name regexp ? limit 1',
	insert_warehouse_record:'INSERT INTO warehouse_record(id,enter_date,vendor,marerial_id,material_name,size,color,unit,count,location,process_level,notes,activities) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
};

module.exports = employees;