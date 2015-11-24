#pragma strict
var health : float = 200f;
var dieEffect : GameObject;

function Start () {

}

function Update () {
    if (health<=0.0)
    {
        GameObject.Instantiate(dieEffect, gameObject.transform.position, gameObject.transform.rotation);
        GameObject.Find("player").SendMessage ("SetScore", 20 ,SendMessageOptions.DontRequireReceiver);
        Destroy(gameObject);
    }
}
