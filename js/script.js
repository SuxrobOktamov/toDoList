let listGroup = document.querySelector('.list-group');
let newform = document.querySelector('#newform');
let newitem = document.querySelector('#newitem');
let emptylist = document.querySelector(".emptylist");
let togglebuttonWrapper = document.querySelector(".togglebutton-wrapper");



let newArr = [];
let count = 1;


if(newArr.length == 0) {togglebuttonWrapper.style.display = 'none'};

newform.addEventListener('submit', (e)=>{
    e.preventDefault();

    let li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `
        <span class="label">${newitem.value}</span>
        <div class="actions">
            <button class="btn-picto pico1" type="button">  
                <span class="material-symbols-outlined  done"> done </span>
                <span class="material-symbols-outlined good ">  check_box_outline_blank </span>
            </button>
            <button class="btn-picto" type="button" >
                <span class="material-symbols-outlined delete"> delete </span>
            </button>
        </div>
    `;
    listGroup.appendChild(li);
    newArr.push({ id:count, value: newitem.value });
    count++;
    newitem.value = '';   
    if(newArr.length != 0) {
        emptylist.style.display = 'none' ;
        togglebuttonWrapper.style.display = 'block';           
    };
    
});

listGroup.addEventListener( 'click', (e)=>{
    if( e.target.classList.contains('delete')){
        newArr.pop();
        count--
        e.target.parentNode.parentNode.parentNode.remove();
    }
    
    if(e.target.classList.contains('good')){
        e.target.parentNode.parentNode.parentNode.classList.toggle('done');
        e.target.parentNode.parentNode.classList.toggle('show');
    };
    if( newArr.length == 0 ){
        emptylist.style.display = 'block';  
        togglebuttonWrapper.style.display = 'none';
    };
    

} );

let sortedArray = [];
let list = [];
let one = 1;

togglebuttonWrapper.addEventListener('click', (e)=>{
    if( e.target.classList.contains('tooglebutton-box') ){
        e.target.parentNode.parentNode.classList.toggle('togglebutton-checked');

        list = Array.from(listGroup.getElementsByTagName("li"));
        if( one == 1 ){   
            let doneArray = list.filter((item)=> item.classList.contains('done'));
            let notDoneArray = list.filter((item)=> !item.classList.contains('done'));
            sortedArray = [...notDoneArray, ...doneArray];

            sortedArray.forEach((item)=>{
                listGroup.appendChild(item);
            });
            one = 2
        }else{            
            let doneArray = list.filter(function(item) { return item.classList.contains('done')});
            let notDoneArray = list.filter(function(item) { return !item.classList.contains('done') });
            
            sortedArray = [ ...doneArray , ...notDoneArray];
            sortedArray.forEach((item)=>{
                listGroup.appendChild(item);
            });
            one = 1
        }
    };
})