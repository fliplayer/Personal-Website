<?php
	require 'mysql.php';
	
	$db_con = mysql_connect($host, $user, $password);
	$nickname = htmlspecialchars($_GET['nickname']);
	$score = htmlspecialchars($_GET['score']);
	if(substr($nickname,0,6) != "&amp;#") {
		$nickname = substr($nickname, 0, 22);
	}
	if($nickname == "") {
		$nickname = "Stahp it PLEASE. You make me cry";
	}
	

	if($db_con){
		mysql_select_db("poopgame", $db_con);
		$query = "insert into scores values('$nickname',$score,now());";
		$result = mysql_query($query);
	}

?>

