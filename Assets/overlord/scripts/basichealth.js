#pragma strict
var health : float = 200f;
var dieEffect : GameObject;
var Effect : ParticleSystem;

function Start () {

}

function Update () {
    if (health<=0.0)
    {

        death();
    }
}

function death()
{
    GameObject.Instantiate(dieEffect, gameObject.transform.position, gameObject.transform.rotation);
    GameObject.Find("player").SendMessage ("SetScore", 20 ,SendMessageOptions.DontRequireReceiver);
    GameObject.Find("player").SendMessage ("increaseKillNumber", 1 ,SendMessageOptions.DontRequireReceiver);
    Effect.transform.position = gameObject.Find("overlord").transform.position;
    Effect.enableEmission = true;
    Destroy(gameObject);
}