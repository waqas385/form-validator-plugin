# form-validator-plugin
This is a Jquery plugin. It is quite easy to use and can be modified easily as per requirement

# Requirement
Include latest version of Jquery file in your project

# How to use it
Include form_validator.js in your project after jquery file was included.

Then you can call the validator through a simple code:
$("form").wValidateForm();

# How it will work

I will explain its working via following example:

# CASE 1: HTML FORM SUBMIT
```
<form name="loginForm" onSubmit="$(this).wValidateForm()">
	<input type="email" name="email" id="email" class="required valid_email" placeholder="Email"/>
	<input type="password" name="password" id="password" class="required" placeholder="Password"/>
	<input type="submit" value="Send"/>
</form>
```

# CASE 3: ON CLICK EVENT 
```
<form name="loginFormSecond" id="loginFormSecond">
	<input type="email" name="email" id="email" class="required valid_email" placeholder="Email"/>
	<input type="password" name="password" id="password" class="required" placeholder="Password"/>
	<input type="button" id="sendForm" value="Send"/>
</form>

<script>
// Jquery oload function
$(function(){
	// Make sure you have included Jquery library file

	$("#sendForm").click(function(){
		if ($('#loginFormSecond').wValidateForm()) {
			// Form validates
			// Send form data via AJAX
			var dataString = $('loginFormSecond').serialize();
			// Perform AJAX submition
		} 

		// ELSE do nothing
	});
});

</script>
```