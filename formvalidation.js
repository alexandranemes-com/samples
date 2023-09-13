function validateContactForm(){
    let cf_validated = false,
        cf = document.getElementById("contact-form"),
        cf_name = document.getElementById("name"),
        cf_email = document.getElementById("email"),
        cf_org = document.getElementById("organisation"),
        cf_title = document.getElementById("title"),
        cf_project_details = document.getElementById("details"),
        cf_project_timeline = document.getElementById("timeline"),
        cf_submit = document.getElementById("submit"),
        cf_project_status = document.querySelectorAll("input[name=project-type]");
    
    const text_fields = [cf_name, cf_email, cf_org, cf_title, cf_project_details, cf_project_timeline];
    const form_error_message = "The form contains errors or is missing information.";
    const missing_information_warning_text = "This information is required.";
    const email_missing_sign = "Email must contain '@' sign.";



    // validate EACH field onblur
    text_fields.forEach((item) => {
        item.addEventListener("blur", (e) => {
            e.preventDefault();
            if(item.value.trim() == ""){
                create_warning_dom(item);
            }
        })
    });

    // remove warning label when user returns to EACH field
    text_fields.forEach((item) => {
        item.addEventListener("focus", (e) => {
            e.preventDefault();
            if(item.value.trim() == ""){
                remove_warning_dom(item);
            }
        })
    })
    
    // TODO validate entire form on submit
    cf.addEventListener("submit", (e) => {
        e.preventDefault();

        // validate radio buttons
        let a_radio_button_was_checked = false;
        cf_project_status.forEach((item) => {
            if(item.checked == true){
                a_radio_button_was_checked = true;
            } else {
                create_warning_dom(item, missing_information_warning_text)
            }
        });

        //validate email address
        let email_format_ok = false;
        if(cf_email.value.includes("@") == false){
            create_warning_dom(cf_email, email_missing_sign);
        } else {
            email_format_ok = true;
        }

        if(a_radio_button_was_checked == true && email_format_ok == true){
            cf_validated == true;
        } else {
            create_warning_dom(cf, form_error_message)
        }
    });

}

// build DOM warning
function create_warning_dom (element, message){
    // const warning_text = "This information is required.";
    let warning_label = document.createElement("label");

    element.insertAdjacentElement("afterend", warning_label);
    warning_label.classList.add('warning-label');
    warning_label.textContent = message;
}

// remove DOM warning
function remove_warning_dom (element){
    let warning_label = element.nextSibling;
    
    if(warning_label != null){
        warning_label.remove();
    }
}

validateContactForm();