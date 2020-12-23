const add=document.querySelector('.submit');
document.querySelector('.close').style.visibility="hidden";
let message=document.querySelector('.message');
let searchBTN=document.querySelector("input[value='Search']");
message.style.display="none";
let filterTask=document.querySelector("input[name='filterText']");
let filterDuration=document.querySelector("input[name='filterDuration']");
let refreshBTN=document.querySelector('.refresh');
let globalarrayoftimers=[]//to contain all the timers;

function removeallprevtimers()
{
    globalarrayoftimers.forEach(e=>clearInterval(e));
}

function removetask(element)
{
    element.srcElement.parentElement.remove();
    let message=document.querySelector('.message');
    message.textContent="Task Removed!";
    message.style.backgroundColor='#F04124';
    message.style.display="flex";
    removeallprevtimers();
    const a=setTimeout(function(){message.style.display="none";}, 3000);
    globalarrayoftimers.push(a);
}

function addtask()
{
    message.style.display="flex";
    removeallprevtimers();
    const a=setTimeout(function(){message.style.display="none";}, 3000);
    globalarrayoftimers.push(a);

    let taskvalue=document.querySelector("input[name='task']").value;
    let deadlinevalue=document.querySelector("input[name='deadline']").value;
    let durationvalue=document.querySelector("input[name='duration']").value;
    
    if (!taskvalue || !deadlinevalue || !durationvalue)
    {
        message.textContent="Please fill in all fields!";
        message.style.backgroundColor='#F04124';
        return;
    }
    
    let newTask=document.createElement('div');
    newTask.className='item';
    
    let task=document.createElement('div');
    task.classList.add('info');
    task.textContent=taskvalue;
    newTask.appendChild(task);
    
    let deadline=document.createElement('div');
    deadline.classList.add('info');
    deadline.textContent=deadlinevalue;
    newTask.appendChild(deadline);
    
    let duration=document.createElement('div');
    duration.classList.add('info');
    duration.textContent=durationvalue;
    newTask.appendChild(duration);
    
    let close=document.createElement('div');
    close.className='close';
    newTask.appendChild(close);
    
    let list=document.querySelector('.list');
    list.appendChild(newTask);
    
    message.textContent='Successfully added new task to list !'
    message.style.backgroundColor='Green';

    document.querySelectorAll('.close').forEach(item=> item.addEventListener('click',removetask));
}

document.querySelectorAll('.close').forEach(item=> item.addEventListener('click',removetask));



function search()
{
    if (!filterDuration.value && !filterTask.value)
    {
        message.style.display="flex";
        message.style.backgroundColor='#F04124';
        message.textContent='Fill in atleast one field for searching!';
        removeallprevtimers();
        const a=setTimeout(function(){message.style.display="none";}, 3000);
        globalarrayoftimers.push(a);
        return;
    }
    if(filterDuration.value)
    {
        let [,...list]=document.querySelectorAll('.info:nth-child(3)');
        list.forEach(item=>{if (Number(item.textContent)>Number(filterDuration.value)) item.parentElement.style.display="none";})
    }

    if(filterTask.value)
    {
        let [,...list]=document.querySelectorAll('.info:nth-child(1)');
        let r=new RegExp(filterTask.value,"i");
        list.forEach(item=>{if (!item.textContent.match(r,"i")) item.parentElement.style.display="none";})
    }
}

function refresh()
{
    filterDuration.value='';
    filterTask.value='';
    let list=document.querySelectorAll('.item');
    list.forEach(item=>item.style.display='flex');
}

add.addEventListener('click',addtask);
searchBTN.addEventListener('click',search);
refreshBTN.addEventListener('click',refresh);