const placeholders = document.getElementsByClassName("placeholders");

function shiftPlaceHoldersUp(x){
        x = x || 0;

        const el = placeholders[x];
        el.animate({
            top: "-70%",
            fontSize: "15px",
            letterSpacing: "1px",
            color: "var(--prim-color)",
            paddingLeft: "3.8px"
        }, { duration: 200, fill: "forwards" });

    
}


function goBackPlaceHoldersDown(x){
    x = x || 0;

    const el = placeholders[x];
    el.animate({
        top: "10%",
        fontSize: "calc(var(--screen-width) / 58)",
        letterSpacing: "0",
        color: "var(--unfocused)",
        paddingLeft: "0px"
    }, { duration: 200, fill: "forwards" });


}



const inputs = document.querySelectorAll(".inputs");

inputs.forEach((input, index) => {
    input.addEventListener("focus", () => {
        shiftPlaceHoldersUp(index);
    });

    input.addEventListener("blur", () => {
        if(input.value!="" && input.value!=undefined)
            return;
        
        goBackPlaceHoldersDown(index);
    });
});




 
// ============= [  form submission JS CODE  ] =========================

const formToSubmit = document.getElementById("formInput");

formToSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    
    const thisForm = new FormData(formToSubmit);

    fetch("https://php-cloud-connect-test-production.up.railway.app/", {
        method: "POST",
        body: thisForm
    })
    .then(Response => Response.text())
    .then(data =>  {
        console.log(data);
    })
    .catch(err => {
        console.error("Error: ", err);
    });
});
