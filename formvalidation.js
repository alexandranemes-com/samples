function validateContactForm(){
    let cf_validated = false,
        cf = document.getElementById("contact-form"),
        cf_name = document.getElementById("name"),
        cf_email = document.getElementById("email"),
        cf_org = document.getElementById("organisation"),
        cf_title = document.getElementById("title"),
        cf_project_status_fresh_project = document.getElementById("fresh-project"),
        cf_project_status_design_ready = document.getElementById("design-ready"),
        cf_project_status_project_started = document.getElementById("project-started"),
        cf_project_status_maintenance = document.getElementById("maintenance"),
        cf_project_status_various = document.getElementById("various"),
        cf_project_details = document.getElementById("details"),
        cf_project_timeline = document.getElementById("timeline"),
        cf_submit = document.getElementById("submit");

    // TODO validate EACH field onblur
    cf_name.addEventListener("blur", (e) => {
        e.preventDefault;
        if(cf_name.value.trim() === ""){
            create_warning_dom(cf_name);
        }
    });

    // TODO remove warning label when user returns to EACH field
    cf_name.addEventListener("focus", (e) => {
        e.preventDefault;
        remove_warning_dom(cf_name);
    });
    
    // TODO validate entire form on submit
    cf.addEventListener("submit", (e) => {
        e.preventDefault();
        if(cf_name.trim() == ""){
            console.log("missing logic on click submit button");
        }
    });
    
}

// build DOM warning
function create_warning_dom (element){
    const warning_text = "This information is required";
    let warning_label = document.createElement("label");

    element.insertAdjacentElement("afterend", warning_label);
    warning_label.classList.add('warning-label');
    warning_label.textContent = warning_text;
}

// remove DOM warning
function remove_warning_dom (element){
    let warning_label = element.nextSibling;
    
    if(warning_label != null){
        warning_label.remove();
    }
}

validateContactForm();