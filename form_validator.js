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
        var e = $(this).find("[name='"+this.name+"']");
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
        // invalid input field check
        // Number or Numeric check
        if (e.hasClass("valid_number")
                && $.trim(v) != "" 
                && !v.isValidNumber()) {
            
            invalid_entry.push(e);
            correct_entry.push('number');
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
            alertMsg += "Invalid "+correct_entry[i]+" entered.\n";
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
