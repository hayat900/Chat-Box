<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
          <script src="http://code.jquery.com/jquery-latest.min.js"></script>                    <script src="http://localhost:8080/socket.io/socket.io.js"></script>                                                 
	<title>ChatIO</title>
	<style>
		body{
			background:#f9f9f9;
		}

		#container{
			width:700px;
			margin:0 auto;
		}

		#chatWindow{
			height:300px;
		}

		#mainWrapper{
			
		}
        #messageForm{
            display:none;
            margin-left:20%;
            margin-top:60%;
        }
		#chatWrapper{
			float:left;
			border:1px #ccc solid;
			border-radius: 10px;
			background:#f4f4f4;
			padding:10px;
            display:none;
        
		}

		#userWrapper{
			float:left;
			border:1px #ccc solid;
			border-radius: 10px;
			background:#f4f4f4;
			padding:10px;
			margin-left:20px;
			width:150px;
			max-height:200px;
            display:none;
            
		}

		#namesWrapper{
			float:left;
			border:1px #ccc solid;
			border-radius: 10px;
			background:#f4f4f4;
			padding:10px;
			margin-left:20px;
            
		}
        #Peopleonline{
            display:none;
            margin-left:60%;
        }
		input{
			height:30px;
			border:solid 1px #ccc;
		}
        .receiver{
            float:right;
        }
        .sender{
            float:left;
        }
        .middle{
            text-align:left;
            
        }
	</style>
</head>
<body>
	<div id="container">
		<div id="namesWrapper">
			
			<p>Create Username:</p>
            <div id="error"></div>
			<form id="usernameForm">
				<input type="text" size="35" id="username">
				<input type="submit" value="Submit" id="user">
			</form>
		</div>

		<div id="mainWrapper">
			<h2>ChatIO</h2>
			<div id="chatWrapper">
				<ul id="chatWindow"></ul>
            </div>
				<form id="messageForm">
					<input type="text" size="35"  id="message" placeholder="Say Something...">
					<input type="submit" value="Submit" id="mes">
				</form>
			
               <div id="Peopleonline">
                   <h4>People Online</h4>
            </div>
			<div id="userWrapper">
				<div id="users"></div>
        
			</div>
		</div>
	</div>
    
</body>
    <script>
   $(function(){
 var socket=io.connect()
 console.log("i ma here");
     var message=$("#message");
     var username=$("#username");
     var messageform=$("#messageForm");
     var usernameform=$("#usernameForm");
     var chatwindow=$("#chatWindow");
       var userwrapper=$("#userWrapper")
       var myname;
    usernameform.submit(function(e){
       e.preventDefault();
         console.log(username.val());
        myname=username.val();
         socket.emit("username",{username:username.val()});
        document.getElementById("chatWrapper").style.display="block";
        document.getElementById("namesWrapper").style.display="none";
        document.getElementById("userWrapper").style.display="block";
        document.getElementById("Peopleonline").style.display="block";
        document.getElementById("messageForm").style.display="block";
        
     });
    myname=username.val();
       username.val('');
socket.on("is_online",function(data){
    chatwindow.append(data.text+"</br>");
    userwrapper.append(data.name+"</br>");
})
messageform.submit(function(e){
    e.preventDefault();
    console.log(message.val());
    socket.emit("new_message",{new_message:message.val()});
    
    message.val('');
   
    
});
       $("#message").focus(function(){
           socket.emit("typing",{name:myname});
       })
  
 socket.on("typing",function(data){
    
    chatwindow.append("<i class='middle'></br>"+ data.username+" is typing.....</i></br>" );
 }) 
          
socket.on("new_message",function(data){
    console.log(data.new_message);
    if(data.username===myname){
        data.colorclass="sender";
    }
    else{
        data.colorclass="receiver";
    }
    chatwindow.append("<li class="+data.colorclass +">"+data.username+" : "+data.new_message+"</li></br></br>" );
    
})
});
    
    
    </script>
</html>