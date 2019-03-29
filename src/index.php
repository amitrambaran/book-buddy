<html>
<h1>Comment</h1>

<?php

$link = mysqli_connect("localhost", "root", "temp", "comments");

$find_comments = mysqli_query($link, "SELECT * FROM 'bookdb'.'comments'");
while($row = mysqli_fetch_assoc($find_comments))
{
    $comment_name = $row['name'];
    $comment = $row['comment'];
    $date = $row['date'];

    echo "$comment_name - $comment<p>";
}

mysqli_free_result($find_comments);

if(isset($_GET['error']))
{
    echo "<p>1000 Character limit";
}

mysqli_close($link);
?>

<form action="post_comment.php" method="POST">
    <input type="text" name="name" value="Your Name"><br>
    <textarea name="comment" cols="50" rows="2">Enter a comment:</textarea>
    <input type="submit" value="Comment">
</form>
</html>