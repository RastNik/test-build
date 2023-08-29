<?php
if(isset($_POST['email'])) {
	$to = 'rastnik@meta.ua';
	$from = 'max@toontube.co';
	$subject = $_POST["form"];
	$message = $_POST['message'];

	$headers = 'From: ' . $from . '' . "\r\n" .
		'Reply-To: ' . $_POST["email"] . '' . "\r\n" .
		'Content-type: text/html; charset=UTF-8' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

	$name = $_POST["name"];
	$email = $_POST["email"];
	$select = $_POST["select"];
	$link = $_POST["link"];

	if ($name) {
		$message .= "
			<table style='width: 400px;max-width: 100%'>
				<tr style='background-color: #f8f8f8;'>
					<td style='width: 20%; padding: 10px; border: #e9e9e9 1px solid;'><b>Name:</b></td>
					<td style='width: 80%; padding: 10px; border: #e9e9e9 1px solid;'>$name</td>
				</tr>
			</table>
		";
	}
	if ($email) {
		$message .= "
			<table style='width: 400px;max-width: 100%'>
				<tr style='background-color: #f8f8f8;'>
					<td style='width: 20%; padding: 10px; border: #e9e9e9 1px solid;'><b>E-mail:</b></td>
					<td style='width: 80%; padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
				</tr>
			</table>
		";
	}
	if ($select) {
		$message .= "
			<table style='width: 400px;max-width: 100%'>
				<tr style='background-color: #f8f8f8;'>
					<td style='width: 20%; padding: 10px; border: #e9e9e9 1px solid;'><b>Select:</b></td>
					<td style='width: 80%; padding: 10px; border: #e9e9e9 1px solid;'>$select</td>
				</tr>
			</table>
		";
	}
	if ($link) {
		$message .= "
			<table style='width: 400px;max-width: 100%'>
				<tr style='background-color: #f8f8f8;'>
					<td style='width: 20%; padding: 10px; border: #e9e9e9 1px solid;'><b>Link:</b></td>
					<td style='width: 80%; padding: 10px; border: #e9e9e9 1px solid;'>$link</td>
				</tr>
			</table>
		";
	}

	if(mail($to, $subject, $message, $headers)) {
		echo 'success';
	} else {
		echo 'error';
	}
}
?>