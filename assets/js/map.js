//set up the variables
const places = getID('places');
const map = getID('map');
const menu = getID('menuShow');
const filterText = getID('filter-text');

filterText.addEventListener('keyup', function (e) {
    e.preventDefault()
    let text = filterText.value;
    console.log(text);
})

//get the ids
function getID(id) {
    return document.getElementById(id);
}