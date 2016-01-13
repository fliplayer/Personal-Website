<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
	include $_SERVER['DOCUMENT_ROOT'].'/avoidthepoop/mysql.php';
	// echo $_SERVER['DOCUMENT_ROOT'];
	$db_con = mysql_connect($host, $user, $password);

	if($db_con){
		mysql_select_db("poopgame", $db_con);
		$query = "select nickname, score from scores order by score DESC, time DESC LIMIT 15;";
		$result = mysql_query($query);
		$scores = array();
		$rank = 1;
		while($array = mysql_fetch_array($result)) {
			array_push($scores, array('nickname'=>htmlspecialchars_decode($array["nickname"],ENT_HTML5), 'score'=>$array["score"]));
		}
		echo json_encode($scores);

	}
	else {
		echo "not connected";
	}

?>