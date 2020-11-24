import traceback
import json
import pandas as pd
from sqlalchemy import *


def get_db(fname="experiments.db"):
  db = create_engine("sqlite:///%s" % fname)
  return db

def make_table_from_dict(db, tname, d):
  """
  Usees keys in @d to create a new table
  """
  try:
    keys = list(sorted(d.keys()))
    attrs = ", ".join(["%s text" % k for k in keys])
    Q = """CREATE TABLE IF NOT EXISTS %s(
        id INTEGER PRIMARY KEY,
        tstamp timestamp,
        %s);
        """ % (tname, attrs)
    db.execute(Q)
  except Exception as e:
    print e
    traceback.print_exc()
    return

def insert_dict_into_table(db, tname, d):
  keys = list(sorted(d.keys()))
  vals = [d[k] for k in keys]
  args = (
      tname,
      ", ".join(keys),
      ", ".join(["?"] * len(keys))
  )
  Q = "INSERT INTO %s (tstamp, %s) VALUES (CURRENT_TIMESTAMP, %s)" % args
  try:
    result = db.execute(Q, tuple(vals))
    return result.lastrowid
  except Exception as e:
    print e
    traceback.print_exc()



def new_exp(db, params):
  """
  Save a new experiment.  Unfortunately, can't use pandas because we want
  to allocate a new row id for each exp...
  """
  make_table_from_dict(db, "exps", params)
  return insert_dict_into_table(db, "exps", params)


def save_exp_details(db, expid, event_type, data):
  """
  Create <event_type> as a table, and populate with
  records in @data.  

  @data  array of dicts, where each dict has the same set of keys
  """
  tname = event_type.lower()

  print("save_exp_details: ", expid)
  for d in data:
    d['expid'] = expid

  pd_data = pd.DataFrame(data)
  pd_data.to_sql(tname, con=db, if_exists='append')


def save_exp_logs(db, expid, exp_fname, block_fname, retrieval_fname):
  """
  Given the two log files stored by the server, we parse and 
  add the experiment id to the data, and then save them into SQLite
  """
  try:
    # assume expfname has fixed schema
    with file(exp_fname, "r") as f:
      exp_data = json.loads(f.read())

    for event_type, data in exp_data.items():
      save_exp_details(db, expid, event_type, data)
  except Exception as e:
    print e
    traceback.print_exc()


  try:
    data = pd.read_csv(block_fname)
    data['expid'] = [expid] * len(data)
    data.to_sql("blocks", con=db, if_exists='append')
  except Exception as e:
    print "******************"
    print e
    traceback.print_exc()
    print "******************"

  try:
    data = pd.read_csv(retrieval_fname)
    data['expid'] = [expid] * len(data)
    data.to_sql("retrieval", con=db, if_exists='append')
  except Exception as e:
    print "******************"
    print e
    traceback.print_exc()
    print "******************"




def pick(d, keys):
  return [d[k] for k in keys]

def create_params(options, base_params, keys=None):
  """
  Given a dictionary of parameters and possible values,
  creates a list of the cross products of all parameter values.

  Note that b has [3] as an element.  The cross product is shallow
  so [3] will be a value in the output.

  Example:
    options = { a: [1,2], b: [[3],4] }
    returns: [ {a:1, b:[3]}, {a:1, b:4}, {a:2, b:[3]}, {a:2, b:4} ]
  """
  if keys is None:
    keys = options.keys()
  if len(keys) == 0:
    return [dict(base_params)]

  ret = []
  key = keys[0]
  vals = options[key]
  if not isinstance(vals, list):
    vals = [vals]

  for val in vals:
    param = dict(base_params)
    param[key] = val
    ret.extend(create_params(options, param, keys[1:]))
  return ret
