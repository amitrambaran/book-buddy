<?php

$link = mysqli_connect("localhost", "root", "temp", "comments");

$name = $_POST["name"];
$comment = $_POST["comment"];

$comment_length = strlen($comment);

if ($comment_length > 1000)
{
    header("location: index.php?error=1");
}
else
{
    mysqli_query($link, "INSERT INTO 'bookdb'.'comments' ('id', 'name','comment', 'date') VALUES('', '$name', '$comment', '')");
    header("location: index.php");
}

mysqli_close($link);
?>