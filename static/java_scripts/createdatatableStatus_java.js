
function buildList(){
let url = "http://localhost:8000/api/testRequest-list";
    fetch(url)
      .then((res) => res.json())
        .then(function(data){ 
        let list = data;
        // if (list.docStatus.toLowerCase() == 'wait approve'){ 
        var data_use = list.filter(function(el){
            return el.docStatus.toLowerCase() == 'wait approve';
         });
        //  const test = data_use.filter(data_use =>data_use.id == 2);
        //  const test2 = Array.from(test)
        //  console.log("Test is ",test['system']);
         $(document).ready(function () {
            $('#example').DataTable({
                data: data_use,
                responsive: true,
                destroy: true,
                scrollX: true,
                // scrollCollapse: true,
                order: [[5, 'desc']],
                fixedColumns:   {
                  left: 1,
              },
                columnDefs:[{
                     "targets":0,
                     "data":"detail_link",
                     "render": function(data,type,row,meta){
                        return'<a href="'+data+'"target="_blank"><img src="/static/image/file.png" style="width: 50px; height: 50px;"></a>';
                      
                     }
                   },{
                    "targets":-2,
                     "data":"Approve_btn",
                     "render": function(data,type,row,meta){
                        return'<button type="button" class="btn bg-success text-light" onclick="changeStatusapprove('+data+')">Approve</button>'; //<img src="/static/image/checkbox.png" style="width: 30px; height: 30px;">
                     }
                   },{
                    "targets":-1,
                     "data":"Reject_btn",
                     "render": function(data,type,row,meta){
                        return'<button type="button" class="btn bg-danger text-light" onclick="changeStatusreject('+data+')">Reject</button>'; //<img src="/static/image/checkbox.png" style="width: 30px; height: 30px;">
                     }
                   }
                  ],
                   columns:[
                        {data:'detailUrl'},
                        {data:'docNumber'},
                        {data:'title'},
                        {data:'department'},
                        {data:'requester'},
                        {data:'requestDate'},
                        {data:'lastUpdate'},
                        {data:'system'},
                        {data:'docStatus'},
                        {data:'attachment'},
                        {data:'approver'},
                        {data:'id'},
                        {data:'id'}
                    ],
                    
                });
            });
        // }
            // setTimeout(function() {
            //     location.reload();
            //     }, 10000);
        });
      }

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
              }
            }
          }
      return cookieValue;
        }
        
const csrftoken = getCookie("csrftoken");

function changeStatusapprove(task){
  // task = id
  console.log("Task",task);
  let status = "Approve";
  let url = `http://localhost:8000/api/testRequest-update/${task}/`;
  fetch(url,{
    method:"POST",
    headers:{
      "Content-type" : "application/json",
      "X-CSRFToken" : csrftoken,
    },
    body:JSON.stringify({title:task , docStatus: status}),
  }).then(function(){
    // console.log("Yeah!!!")
    buildList();
  });
}

function changeStatusreject(task){
  // task = id
  console.log("Task",task);
  let status = "Reject";
  let url = `http://localhost:8000/api/testRequest-update/${task}/`;
  fetch(url,{
    method:"POST",
    headers:{
      "Content-type" : "application/json",
      "X-CSRFToken" : csrftoken,
    },
    body:JSON.stringify({title:task , docStatus: status}),
  }).then(function(){
    // console.log("Yeah!!!")
    buildList();
  });
}
