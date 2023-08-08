var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var studDBName = ' SCHOOL-DB';
var studRelationName = 'STUDENT-TABLE';
var connToken = '90931358|-31949323015691562|90950171';

$('#studId').focus();


function saveRecNo2LS(jsonobj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
    
}

function getStudIdAsJsonObj(){
    var studId = $('#studId').val();
    var jsonStr = {
        id = studId
    };
    return JSON.stringify(jsonStr);
}




function resetForm(){
    $('#studId').val("");
    $('#studName').val("");
    $('#studclass').val("");
    $('#studdob').val("");
    $('#studadd').val("");
    $('#studed').val("");
    $('#studId').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#studId').focus();
   }
   
   function validateData(){
       var studId,studName,studclass,studdob,studadd,studed,studadd;
       studId = $('#studId').val();
       studName = $('#studName').val();
       studclass = $('#studclass').val();
       studdob = $('#studdob').val();
       studed = $('#studed').val();
       studadd = $('#studadd').val();
       
       if(studId === ' '){
           alert("StudId missing");
           $('#studId').focus();
           return " ";
       }
       if(studName === ' '){
           alert("StudName missing");
           $('#studName').focus();
           return " ";
       }
       if(studclass === ' '){
           alert("Studclass missing");
           $('#studclass').focus();
           return " ";
       }
       if(studdob === ' '){
           alert("Studdob missing");
           $('#studdob').focus();
           return " ";
       }
       if(studed === ' '){
           alert("Studed missing");
           $('#studed').focus();
           return " ";
       }
       if(studadd === ' '){
           alert("Studadd missing");
           $('#studadd').focus();
           return " ";
       }
       
       var jsonStrObj = {
           id : studId,
           name : studName,
           class : studclass,
           add : studadd,
           ed : studed,
           dob : studdob
       };
       
       return JSON.stringify(jsonStrObj);
               
       
   }
   
   function saveStudent(){
       var jsonStrObj = validateData();
       if(jsonStrObj===''){
           return "";
       }
       var putRequest = createPUTRequest(connToken,jsonStrObj,studDBName,studRelationName);
       jQuery.ajaxSetup({async:false});
       var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async:true});
        resetForm();
        
        $('#studId').focus();
        
       
       
   }
   
   function changeStudent(){
       $('#change').prop("disabled",true);
       jsonChg = validateData();
       var updateRequest = createUPDATERecordRequest(connToken,jsonChg,studDBName,studRelationName,localStorage.getOwnPropertyNames());
        jQuery.ajaxSetup({async:false});
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async:true});
        console.log(resJsonObj);
        resetForm();
        $('#studId').focus();
   }
   
   function getEmp(){
       var studIdJsonObj = getStudIdAsJsonObj();
       var getRequest = createGET_By_KEYRequest(connToken,studDBName,studRelationName,studIdJsonObj);
       jQuery.ajaxSetup({async:false});
       var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async:true});
       if(resJsonObj.status === 400){
           $('#save').prop("disabled",false);
           $('#reset').prop("disabled",false);
           $('#studName').focus();
           
       }
       else if(resJsonObj.status === 200){
           $('#studId').prop("disabled",true);
           fillData(resJsonObj);
           $('#save').prop("disabled",false);
           $('#reset').prop("disabled",false);
           $('#studName').focus();
           
       }
   }
      
      function fillData(jsonObj){
          saveRecNo2LS(jsonObj);
          var data=JSON.parse(jsonObj.data).record;
        studId = $('#studId').val(data.id);
       studName = $('#studName').val(data.name);
       studclass = $('#studclass').val(data.class);
       studdob = $('#studdob').val(data.dob);
       studed = $('#studed').val(data.ed);
       studadd = $('#studadd').val(data.add);
      }
   
   