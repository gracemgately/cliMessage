


# Bash Script By Matthieu Riegler - http://matthieu.riegler.fr
# Licence CC-BY 0 
#
# This script takes in input a iMessage account input and backs its conversations up as txt files. 
# It also saves its pictures that are cached localy 

#Parameter is a iMessage account (email or phone number i.e. +33616.... )
if [ $# -lt 1 ]; then
    echo "Enter a iMessage account (email of phone number i.e +33616.....) "
fi
login=$1

#Retrieve the text messages and place them in the prevMessages text file

sqlite3 ~/Library/Messages/chat.db "
select is_from_me,text from message where handle_id=(
select handle_id from chat_handle_join where chat_id=(
select ROWID from chat where guid='iMessage;-;$1')
)" | sed 's/1\|/me: /g;s/0\|/budy: /g' > scripts/prevMessages.txt


#echo $(cat scripts/prevMessages.txt) --> for testing

