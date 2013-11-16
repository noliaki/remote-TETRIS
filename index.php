<?php
$useragents = array(
	'iPhone',         // Apple iPhone
	'iPod',           // Apple iPod touch
	'iPad',						//Apple iPad
	'Android',        // 1.5+ Android
	'dream',          // Pre 1.5 Android
	'CUPCAKE',        // 1.5+ Android
	'blackberry9500', // Storm
	'blackberry9530', // Storm
	'blackberry9520', // Storm v2
	'blackberry9550', // Storm v2
	'blackberry9800', // Torch
	'webOS',          // Palm Pre Experimental
	'incognito',      // Other iPhone browser
	'webmate'         // Other iPhone browser
);
$UA = $_SERVER['HTTP_USER_AGENT'];
$smartPhone = mb_ereg(join('|', $useragents), $UA);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>Tetris</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="author" content="noriaki.yamada">
<meta name="copyright" content="Copyright (C) noriaki.yamada">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="index" href="/">
<link rel="stylesheet" href="./css/import.css">
<?php
if($smartPhone){
	echo '<link rel="stylesheet" href="./css/sp.css">';
}
else{
	echo '<link rel="stylesheet" href="./css/pc.css">';
}
?>
<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<script src="//remote.renoat.net:8989/socket.io/socket.io.js"></script>
<script src="//code.jquery.com/jquery-1.7.1.min.js"></script>
<?php
if($smartPhone){
	echo '<script src="./js/controller.js"></script>';
}
else{
	echo '<script src="./js/qrcode.js"></script>';
	echo '<script src="./js/html5-qrcode.js"></script>';
	echo '<script src="./js/tetris.js"></script>';
}
?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45803610-4', 'renoat.net');
  ga('send', 'pageview');

</script>
</head>
<body id="weblabox-com" class="tetris">
<?php
if($smartPhone){
	require_once("./sp.html");
}
else{
	require_once("./pc.html");
}
?>
</body>
</html>
