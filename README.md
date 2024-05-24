# webChat
Web chat create by node.js express.js

# Features
- Add friend
- Chat friend (realtime)
- Block and unBlock (realtime)
- Change image profile
- Register
- Login by google account

# How to run
- Install node js
- Setup database
   - Create database In MAMP or other progarm.
   - Setup database location in Api/modules/database.js
    ```
    const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat_app',
    port: 3306
    });
    `````````
   - Import database use database.sql
- Run 
	- Open terminal in folder Api and use `npm start`
	- Do it again in folder User
	- When computer is show link
	"Server started at port 8080. Run in http://localhost:8080/"
	can click for open webChat
