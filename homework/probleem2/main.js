/* use this to test out your function */
window.onload = function() {
    changeColor("dui", '#FF0000');
    changeColor("nor", '#3333CC');
    changeColor("nlx", '#FF6600');
};

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;
    console.log(document.getElementById(id))
}
