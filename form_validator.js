// JQUERY PLUGIN FOR FORM VALIDATION
// Author: Waqas Ahmed
// Date: 4 August 2016

// First Letter Capital
//http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
String.prototype.wucword = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//http://stackoverflow.com/questions/2855865/jquery-regex-validation-of-e-mail-address
String.prototype.isValidEmail = function () {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(this);
}
//
String.prototype.isValidNumber = function () {
    var pattern = /^\d+$/;
    return pattern.test(this);
}


String.prototype.validateDate = function () {
    return isValidDate(this);
}

// Validates that the input string is a valid date formatted as ("mm/dd/yyyy", "dd/mm/yyyy", "dd.mm.yyyy", "yyyy-mm-dd")
function isValidDate (dateString) {
	var dateFormatReg, parts, month, day, year, separator;
        if (portal_dateformat == undefined || portal_dateformat == null) {
            portal_dateformat = "mm/dd/yyyy";
        }
        
	switch (portal_dateformat) {
		case "YYYY-MM-DD":
		case "yyyy-mm-dd":
			dateFormatReg = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
			separator = "-";
			break;
		case "DD/MM/YYYY":
		case "dd/mm/yyyy":
			dateFormatReg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
			separator = "/";
			break;
		case "DD.MM.YYYY":
		case "dd.mm.yyyy":
			dateFormatReg = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
			separator = ".";
			break;
		default:
			// MM/DD/YYYY
			// mm/dd/yyyy
			dateFormatReg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
			separator = "/";
			break;
	}
	
	// First check for the pattern
    if(!dateFormatReg.test(dateString))
        return false;
	
    // Parse the date parts to integers
	switch (separator) {
		case ".":
			parts = dateString.split(".");
			day = parseInt(parts[1], 10);
			month = parseInt(parts[0], 10);
			year = parseInt(parts[2], 10);
	
			break;
		case "-":
			parts = dateString.split("-");
			day = parseInt(parts[2], 10);
			month = parseInt(parts[1], 10);
			year = parseInt(parts[0], 10);
	
			break;
		default:
			parts = dateString.split("/");
			if (portal_dateformat === "DD/MM/YYYY"
                                || portal_dateformat === "dd/mm/yyyy") {
                            
				day = parseInt(parts[0], 10);
				month = parseInt(parts[1], 10);
				year = parseInt(parts[2], 10);
			} else {
				day = parseInt(parts[1], 10);
				month = parseInt(parts[0], 10);
				year = parseInt(parts[2], 10);
			}
	
			break;
	}
   

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};


// Validates form fields
$.fn.wValidateForm = function () {
    //var a = this.serializeArray();
    // To validate all fields within any container
    var  a = $(this).find('input,textarea,select');
    
    // Apply class to inputs
    a.removeClass('bdr-red');
    var inp = new Array();
    var invalid_entry = new Array();
    var correct_entry = new Array();
    var alertMsg = '';
    var password = null, confirm_password = null;
    $.each(a, function () {
        var e = $("[name='"+this.name+"']");
        // Check added for serialize array and non serialize array
        if (o instanceof HTMLElement) {
            e = $(this);
        }
        // incase button
        if ($(e).is('button')) {
            return true;
        }
        var v = e.val();
        // field is required & empty
        if (e.hasClass("required")
                && $.trim(v) == "") {
            
           inp.push(e);
        }
        
        // invalid input field check
        // Email Check
        if (e.hasClass("valid_email")
                && $.trim(v) != "" 
                && !v.isValidEmail()) {
            
            invalid_entry.push(e);
            correct_entry.push('email');
        }
        // Number or Numeric check
        if (e.hasClass("valid_number")
                && $.trim(v) != "" 
                && !v.isValidNumber()) {
            
            invalid_entry.push(e);
            correct_entry.push('number');
        }
        // Date format check
        if (e.hasClass("valid_date")
                && $.trim(v) != "" 
                && !v.validateDate()) {
            
            invalid_entry.push(e);
            correct_entry.push('date');
        }
        
        if (this.name == "password") {
            password = v;
        }
        if (this.name == "confirm_password") {
            confirm_password = v; 
        }
           
    });

    // Required field check message
    if (inp.length > 0) {
        
        $.each(inp, function(i, e){
            var eleName = e.prop('name');
            var eleMsg = $.trim(eleName.wucword().replace(/[_\[\]\{\}]|temp/gi, '')) + " is required.\n";
            // data-label exists
            // to show custom message for specific field
            if ($.trim($(e).data('label')) != "") {
                eleMsg = $(e).data('label') + " is required.\n";
            }
             
            // Apply forder
            e.addClass('bdr-red');

            alertMsg += eleMsg;
        });

        alert(alertMsg);
        return false;
    }
    
    // validate entered value message
    if (invalid_entry.length > 0) {
        $.each(invalid_entry, function(i, e){
            var eleName = e.prop('name');
            var eleMsg = "Invalid "+correct_entry[i]+" is entered.\n";
            
            // Apply border
            e.addClass('bdr-red');
            alertMsg += eleMsg;
        });

        alert(alertMsg);
        return false;
    }
    // Password & Confirm Password
    if ( password != null 
            && confirm_password != null
            && $.trim(password) != "" 
            && $.trim(confirm_password) != ""
            && (password != confirm_password)) {
        alert("Password & Confirm Password should match.");
        return false;
    }
    
    return true;
}
