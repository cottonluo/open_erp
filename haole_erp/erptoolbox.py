import json
from datetime import datetime
from datetime import date


def fetch_colname_data(sql):
    import MySQLdb
    db = MySQLdb.connect("localhost", "root", "hl85", "taobao_order", charset="utf8")
    cursor = db.cursor()
    cursor.execute(sql)
    column_names = [t[0] for t in cursor.description]
    data = cursor.fetchall()
    db.commit()
    db.close()
    return column_names, data


def execute_sqls(listofsql):
    import MySQLdb
    db = MySQLdb.connect("localhost", "root", "hl85", "taobao_order", charset="utf8")
    cursor = db.cursor()
    for sql in listofsql:
        cursor.execute(sql)
    db.commit()
    db.close()
    return


def executemany_data_sql(sql_detail, row_detail):
    import MySQLdb
    db = MySQLdb.connect("localhost", "root", "hl85", "taobao_order", charset="utf8")
    cursor = db.cursor()
    cursor.executemany(sql_detail, row_detail)
    db.commit()
    db.close()
    return


class CJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)


def json_formated(col_name, data):
    json_list=[]
    for d in data:
        json_dict=dict(zip(col_name, d))
        # json_str=json.dumps(json_dict,ensure_ascii=False,cls=CJsonEncoder)
        # json_list.append(json_str)
        json_list.append(json_dict)
    return json.dumps({"data":json_list},ensure_ascii=False,cls=CJsonEncoder)
