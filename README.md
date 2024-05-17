# webChat
Web chat create by node.js express.js

# Features
- Add friend
- Chat friend (not realtime)
- Change image profile

# How to run
- Install node js
- Setup database
   - Create database In MAMP or other progarm.
   - Setup database location in Api/modules/database.js

        const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'chat_app',
        port: 3306
        });

   - Import database use database.sql
- Run 
	- Open terminal in folder Api and use `npm start`
	- Do it agine in folder User
	- When complete is show linek 
	"Server started at port 8080. Run in http://localhost:8080/"
	can clike for open webChat