document.addEventListener('DOMContentLoaded', function() {
    var addClassBtn = document.getElementById('addClassButton')
    // onClick's logic below:
    addClassBtn.addEventListener('click', function() {
        addClass();
    });
});


function addClass(){
    let className = document.getElementById('className').value
    let classUrl = document.getElementById('classUrl').value
    let meetingUrl = document.getElementById('meetingUrl').value
    let meetingPassword = document.getElementById('meetingPassword').value

    if(className === "" || classUrl === "" || meetingUrl === "" || meetingPassword === ""){
        document.getElementById('errorMsg').innerHTML = "Some fields are empty"
    }else{
        chrome.storage.sync.get(function(items) {
            if (Object.keys(items).length > 0 && items.data) {
                // The data array already exists, add new data
                items.data.push({
                    ClassName: className,
                    ClassUrl: classUrl, 
                    MeetingUrl: meetingUrl, 
                    MeetingPassword: meetingPassword
                    
                });
            } else {
                // The data array doesn't exist yet, create
                items.data = [{
                        ClassName: className,
                        ClassUrl: classUrl, 
                        MeetingUrl: meetingUrl, 
                        MeetingPassword: meetingPassword
                    }];
            }
        
            // Save data
            chrome.storage.sync.set(items, function() {
                history.back();
            });
            
        });
    }

}