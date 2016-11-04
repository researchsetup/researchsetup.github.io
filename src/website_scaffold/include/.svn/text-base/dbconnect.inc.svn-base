<?php
    $dbhost = 'sql.mit.edu';
    $dbuser = 'eugenewu';
    $dbpass = 'lifeofaronin';
    $dbname = 'eugenewu+dw'; 
    $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    try {
      if ($conn != NULL) {
        if (!mysql_select_db($dbname)) {
          mysql_close($conn);
          $conn = NULL;
        }
      }
    } catch (Exception $e) {
      $conn = NULL;
    }
?>