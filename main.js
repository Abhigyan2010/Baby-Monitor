objects=[];
object_status="";

function preload(){
    alarm=loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.parent("canvas");
    canvas.center();
    video=createCapture(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Go Time")
    object_status=true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    objects=results;
    console.log(objects)
}
function draw(){
    image(video,0,0,380,380);
    if (object_status!=""){
        for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status: Objects Detected";
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}