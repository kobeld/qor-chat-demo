HOME=/home/app
PRJ_HOME=$HOME/gopkg/src/github.com/kobeld/qor-chat-demo

echo "cd app path"
cd $PRJ_HOME

echo "git pulling..."
git checkout save-conversation  # NOTE change it ot related branch
git pull


echo "killing old process"
killall -9 revel;

echo "deploying"
nohup revel run github.com/kobeld/qor-chat-demo >> qor-chat-demo.log 2>&1 &

echo "done"

