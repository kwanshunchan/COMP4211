#pragma strict
var health : float = 200f;

function Start () {

}

function Update () {
    Debug.Log(health);
    if (health<=0.0)
    {Destroy(gameObject);}
}
