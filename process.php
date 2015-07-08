<?php

header('Content-Type: application/json');

$type = $_GET['type'];
$toAssocArray = true;
$json = $_POST["formData"];
$pdata = json_decode(stripslashes($json), $toAssocArray);

switch($type) {
    case "reg":
        $rdata = process_registration($pdata);
        break;
    case "appointment":
        $rdata = process_appointment($pdata);
        break;
    case "volunteer":
        $rdata = process_volunteer($pdata);
        break;
    default:
        return false;
}
// return all our data to an AJAX call

echo json_encode($rdata);

// ===== FUNCTIONS ===== //
function process_appointment($pdata) {
    $errors = array();
    $data = array();

    // validate the variables
    if (empty($pdata['name']))
            $errors['name'] = 'Name is required.';

    if (empty($pdata['email']))
            $errors['email'] = 'Email is required.';

    if (empty($pdata['dob']))
            $errors['dob'] = 'Date of Birth is required.';

    // response if there are errors
    if (!empty($errors)) {
        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        // create and send off email
        if(sendAppointmentRequest($pdata)){
            // if the email sent and there are no errors, return a message
            $data['success'] = true;
            $data['message'] = 'Request has been submitted! You will be contacted soon to confirm an appointment date.';
        } else {
            // if the email could not send, return a message
            $data['success'] = false;
            $data['error'] = 'Request could not be sent';
        }
    }

    return $data;
}

function sendAppointmentRequest($posted){

    /* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
    // $to_email = "missywilliams85@gmail.com";
    $to_email = "lifelineprc@sbcglobal.net";


    $subject = "New Appointment Request";

    $message = "A new appointment request has been submitted through the website.\n\n";
    $message .= "Name: ".$posted['name'];
    $message .= "\nEmail: ".$posted['email'];
    $message .= "\nDOB: ".$posted['dob'];
    $message .= "\n\nHas visisted Lifeline before: ".(($posted['previous'])?"Yes":"No");

    $message .= "\n\nWould prefer to visit on a ".$posted['day']['day']." at a preferred time of ".$posted['time']['time'];
    $message .= "\n\nType of visit: ".$posted['service']['service'];

    //$additional_headers = 'From: New Appointment Request <donotreply@lifeline.com>';

    // Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
    if (mail($to_email,$subject,$message)) {
      return true;
    } else {
      return false;
    }
}

function process_registration($pdata) {
    $errors = array();
    $data = array();

    // validate the variables


    // response if there are errors
    if (!empty($errors)) {
        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        // create and send off email
        if(sendRegistration($pdata)){
            // if the email sent and there are no errors, return a message
            $data['success'] = true;
            $data['message'] = 'The form has been submitted! You will be contacted soon to confirm your registration.';
        } else {
            // if the email could not send, return a message
            $data['success'] = false;
            $data['error'] = 'Request could not be sent. Please try again or contact us directly.';
        }
    }

    return $data;
}

function sendRegistration($posted){

    /* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
    // $to_email = "missywilliams85@gmail.com";
    $to_email = "lifelineprc@sbcglobal.net";


    $subject = "New Walk for Life 2015 Registration";

    $message = "A new registration has been submitted through the website.\n\n";

    if(array_key_exists("teammate", $posted)){
        $pop = $posted['teammate'];
        unset($posted["teammate"]);
        array_push($posted, $pop);
    }

    $full_name = $posted['fname']." ".$posted['lname']."\n\n";
    unset($posted['fname']);
    unset($posted['lname']);

    $message .= "Name: ".$full_name;

    foreach($posted as $key => $value){
        if($key == "teammate") {
            $message .= "Team members:\n";
            foreach ($value as $k => $t) {
                $message .= "".$t['fname'].' '.$t['lname']."\n";
            }
            $message .= "\n";
        } else {
            $message .= "".ucfirst($key).": ".$value."\n\n";
        }
    }

    $message .= "\n\nPlease contact this registrant to confirm their registration.";

    //$additional_headers = 'From: New Walk for Life 2014 Registration <donotreply@lifeline.com>';

    // Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
    if (mail($to_email,$subject,$message)) {
      return true;
    } else {
      return false;
    }
}

function process_volunteer($pdata) {
    $errors = array();
    $data = array();

    // validate the variables
    if (empty($pdata['name']))
            $errors['name'] = 'Name is required.';

    if (empty($pdata['email']))
            $errors['email'] = 'Email is required.';

    if (empty($pdata['address']))
            $errors['address'] = 'Address is required.';

    if (empty($pdata['phone']))
            $errors['phone'] = 'Phone number is required.';

    // response if there are errors
    if (!empty($errors)) {
        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        // create and send off email
        if(sendVolunteerRequest($pdata)){
            // if the email sent and there are no errors, return a message
            $data['success'] = true;
            $data['message'] = 'Request has been submitted! You will be contacted soon with the requested information.';
        } else {
            // if the email could not send, return a message
            $data['success'] = false;
            $data['error'] = 'Request could not be sent';
        }
    }

    return $data;
}

function sendVolunteerRequest($posted){

    /* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
    // $to_email = "missywilliams85@gmail.com";
    $to_email = "lifelineprc@sbcglobal.net";

    $type = $posted['type'];

    $subject = "A new request has been submitted through the website!";
    if($type == "volunteer") {
        $subject = "Someone is interested in becoming a volunteer!";
        $message = "A request for information about volunteering has been submitted through the website.\n\n";
    } elseif ($type == "board") {
        $subject = "You have a new request to learn more about the Board of Directors!";
        $message = "A request for information about the Board of Directors has been submitted through the website.\n\n";
    }

    $message .= "Name: ".$posted['name'];
    $message .= "\nEmail: ".$posted['email'];
    $message .= "\nAddress: ".$posted['address'];
    $message .= "\nPhone: ".$posted['phone'];

    if($type == "volunteer"){
        $message .= "\nType of service preferred: ".$posted['serviceType'];
    }

    //$additional_headers = 'From: New Appointment Request <donotreply@lifeline.com>';

    // Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
    if (mail($to_email,$subject,$message)) {
      return true;
    } else {
      return false;
    }
}
?>