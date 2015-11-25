#pragma strict
var Effect : ParticleSystem;
var timer:float;
var position:Vector3;
function Start () {

}

function Update () {
    if(Effect.enableEmission == true )
    {
        timer += Time.deltaTime;
        if(timer>3)
        {Effect.enableEmission = false;}
    }
    else
    {
        timer=0;
    }
}