from fabric.api import run, env, local


def build():
  local('python build.py') 

def push(msg="updated website"):
  build()
  local('git commit -am "%s"' % msg)  
  local('git push')


