#pragma strict
var camera1:GameObject;
var camera2:GameObject;


function Start () {
    camera1.active = true;
    camera2.active = false;
}

function Update () {
    if(Input.GetKeyDown(KeyCode.C))
    {
        if(camera1.active == true)
        {
            camera1.active = false;  
            camera2.active = true;  
        }
        else
        {
            camera1.active = true;  
            camera2.active = false;
        }
    }
}