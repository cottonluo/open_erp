# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import tornado.options
import tornado.gen
import json
from erptoolbox import *
from tornado.httpserver import *
import os


# from tornado.concurrent import run_on_executor
# from concurrent.futures import ThreadPoolExecutor
# from tornado.ioloop import IOLoop
class get_similar_warehouse_record(tornado.web.RequestHandler):
    def options(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Method', 'get,post,options')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type')
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Method', 'get,post,options')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type')
        arguments = self.request.arguments
        for k in arguments:
            sql="select * from warehouse_record where material_name regexp %s limit 5" % (arguments[k][0])
            column_names, data=fetch_colname_data(sql)
        json_dict=json_formated(column_names, data)
        self.finish(json_dict)
        print "Query Done"
        return
class insert_records_warehouse_record(tornado.web.RequestHandler):
    def options(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Method', 'get,post,options')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type')
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Method', 'get,post,options')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type')
        arguments = self.request.arguments
        row_detail=[]
        for k in json.loads(arguments["content"][0]):
            k.pop("id")
            if k["material_name"]=='' or k["vendor"]=='' or k["count"]=='':
                continue
            else:
                columns = ', '.join(k.keys())
                k["enter_date"]=datetime.strptime(k["enter_date"],"%Y-%m-%d %H:%M:%S")
                row_detail.append([k[str(x).strip()] for x in columns.split(',')])
        placeholders = ', '.join(['%s'] * len(k))
        sql_detail = "INSERT INTO %s ( %s ) VALUES ( %s )" % (arguments["table"][0], columns, placeholders)
        executemany_data_sql(sql_detail, row_detail)
        self.finish()
        # print "Query Done"
        return

class BaseHandler(tornado.web.RequestHandler):
    def get(self):
        self.write_error(404)

    def write_error(self, status_code, **kwargs):
        if status_code == 404:
            self.write('error:' + str(status_code))
        elif status_code == 500:
            self.write('error:' + str(status_code))
        else:
            self.write('error:' + str(status_code))
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "template_path": os.path.join(os.path.dirname(__file__), "templates")
}
if __name__ == "__main__":
    # tornado.options.parse_command_line()
    application = tornado.web.Application([(r".*", BaseHandler),(r"/get_similar_warehouse_record", get_similar_warehouse_record),(r"/insert_records_warehouse_record", insert_records_warehouse_record)], debug=False, **settings)
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.bind(8888)
    http_server.start(1)
    # application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
