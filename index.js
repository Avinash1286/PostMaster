let jBox=document.getElementById('jBox');
let paraBox=document.getElementById('paraBox');
let jRadio=document.getElementById('json');
let pRadio=document.getElementById('customPara');
let addPara=document.getElementById('addParameter');
let morePara=document.getElementById('morePara');
let deleteParas=document.getElementsByClassName('deleteParas');
let submit=document.getElementById('submit');



let paraCount=0;
paraBox.style.display="none";

function createElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

jRadio.addEventListener('click',()=>{
    jBox.style.display="block";
    paraBox.style.display="none";
});


pRadio.addEventListener('click',()=>{
    paraBox.style.display="block";
    jBox.style.display="none";
});


addPara.addEventListener('click',()=>{
    
    let string=`
                <div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${paraCount+2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${paraCount+2}" placeholder="Enter Parameter ${paraCount+2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${paraCount+2}" placeholder="Enter Parameter ${paraCount+2} Value">
                    </div>
                    <button  class="btn btn-primary deleteParas">-</button>
                </div>
               `
               paraCount++;
               let elemetn=createElementFromString(string);
               morePara.append(elemetn);

               for(item of deleteParas){
                item.addEventListener('click',(e)=>{
                    e.target.parentElement.remove();
            
                })
            }
                            

});


submit.addEventListener('click',()=>{
    let url=document.getElementById('url').value;
    let reqType=document.querySelector('input[name="reqType"]:checked').value;
    let cType=document.querySelector('input[name="CType"]:checked').value;
     document.getElementById('responsePrism').innerHTML="Please wait...fetching data!";
    if(cType=="customPara"){
        data={};
        for(let i=0;i<paraCount+1;i++){
            console.log(i);
            if(document.getElementById('parameterKey'+(1+i)) !=undefined){
                let key=document.getElementById('parameterKey'+(1+i)).value;
                let values=document.getElementById('parameterValue'+(1+i)).value;
                data[key]=values;
            }
        }

        data= JSON.stringify(data);

    }
    else{
        data=document.getElementById('jsonData').value;
        console.log("your data is", data);
    }

    if(reqType=="GET"){

        fetch(url,{
         method: 'GET'   
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        });

    }
    else{
    
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
             "Content-type": "application/json; charset:UTF-8"
            }
        })
        .then(response=> response.text())
        .then((text)=>{
            console.log('returned data is ', text);
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })


    }



    console.log('Url is ',url);
    console.log('reqType is ',reqType);
    console.log('contentType is ',cType);
    console.log('Data is ',data);


})




