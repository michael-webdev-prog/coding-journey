const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.value;
        
        
        if (value === "c") {

    display.value = "";

} else if (value === "=") {

            display.value = eval(display.value);

        } else {

            
            display.value += value; 
        
        }
    
    });

});