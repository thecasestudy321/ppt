<?php
function read_file($filename)
{
$fp = fopen($filename, "r") or die("couldn't open $filename");
$read = fread($fp, filesize($filename));
fclose($fp);
return $read;
}
/**
* 写文件
**/
function write_file($filename, $buffer)
{
$fp = fopen($filename, "w") or die("couldn't open $filename");
flock( $fp, LOCK_EX );
$write = fputs($fp, $buffer);
flock( $fp, LOCK_UN );
fclose($fp);
return true;
}
/**
* 修改(只是追加内容)
**/
function append_to_file($filename, $buffer)
{
$fp = fopen($filename, "a") or die("couldn't open $filename");
flock( $fp, LOCK_EX );
fputs($fp, $buffer);
flock( $fp, LOCK_UN );
fclose($fp);
return true;
}
/**
* 测试
**/
$str = read_file('vendor.fdb4e12fa72e6e7bde0d.bundle.js');


$str=preg_replace('/\(e\){/','(e){'."\r\n",$str);
$str=preg_replace('/\(n\){/','(n){'."\r\n",$str);
//$str=preg_replace('/}/','}'."\r\n",$str);
write_file('vendor.fdb4e12fa72e6e7bde0d.bundle2.js', $str);


?>