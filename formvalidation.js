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
    
    const text_fields = [cf_name, cf_email, cf_org, cf_project_details, cf_project_timeline];
    const form_error_message = "The form contains errors or is missing information.";
    const missing_information_warning_text = "This information is required.";
    const email_missing_sign = "Email must contain '@' sign.";
    const title_error = "You must select an option.";

    // validate EACH text field onblur
    text_fields.forEach((item) => {
        item.addEventListener("blur", (e) => {
            e.preventDefault();
            if(item.value.trim() == ""){
                create_warning_dom(item, missing_information_warning_text);
            }
        })
    });

    // remove warning label when user returns to EACH text field
    text_fields.forEach((item) => {
        item.addEventListener("input", (e) => {
            e.preventDefault();
            remove_warning_dom(item.nextElementSibling);
        })
    })
    
    // TODO validate entire form on submit
    cf.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // validate text fields
        text_fields.forEach((item) => {
            if(item.value.length == 0){
                create_warning_dom(item, missing_information_warning_text);
            } else {
                remove_warning_dom(item.nextElementSibling);
            }
        });

        //validate dropdown (title)
        let cf_title_picked = false;
        if(cf_title.value === ""){
            create_warning_dom(cf_title, title_error)
        } else {
            cf_title_picked = true;
            remove_warning_dom(cf_title.nextElementSibling);
        }

        // validate radio buttons
        let project_stage_area = document.getElementById("project-stage");
        let a_radio_button_was_checked = false;
        create_warning_dom(project_stage_area, missing_information_warning_text);
        cf_project_status.forEach((item) => {
            if(item.checked){
                a_radio_button_was_checked = true;
                remove_warning_dom(project_stage_area.nextElementSibling);
            }
        });

        if(a_radio_button_was_checked == true && cf_title_picked == true){
            cf_validated == true;
            remove_warning_dom(cf.nextElementSibling);
        } else {
            create_warning_dom(cf, form_error_message);
        }
    });
}

// build DOM warning
function create_warning_dom (element, message){
    let warning_label = element.nextElementSibling;

    if(warning_label == null || warning_label.matches(".warning-label") == false){
        warning_label = document.createElement("label");
        element.insertAdjacentElement("afterend", warning_label);
        warning_label.classList.add('warning-label');
        warning_label.textContent = message;
    }
}

// remove DOM warning
function remove_warning_dom (element){
    if(element != null && element.matches(".warning-label")){
        element.remove();
    }
}

validateContactForm();