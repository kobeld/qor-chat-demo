SERVER=qortex.theplant-dev.com
HOME=/home/app
USER=app
EXE_SCRIPT=onserver_dev.sh

scp $EXE_SCRIPT $USER@$SERVER:$HOME
ssh $USER@$SERVER "chmod +x $HOME/$EXE_SCRIPT && $HOME/$EXE_SCRIPT"

