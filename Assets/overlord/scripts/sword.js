﻿#pragma strict
//var impactPrefab : Transform;
var mask : LayerMask;
var damage : float = 25;
var canattack : boolean = true;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) 
    {
        Debug.Log(collision.gameObject.name);
	
        if (true)
        {
            for (var contact: ContactPoint in collision.contacts)
            {
               //var impact = Instantiate(impactPrefab, contact.point, Quaternion.FromToRotation(Vector3.up,contact.normal));
               
            }

            if(collision.gameObject.name=="player")
            {
                
                var audio: AudioSource = transform.root.gameObject.GetComponent.<AudioSource>();
                audio.Play();
                collision.gameObject.SendMessage ("Damage", damage,SendMessageOptions.DontRequireReceiver);
           
            }
            
            if(collision.gameObject.name=="Protect Object")
            {
                
                var audio1: AudioSource = transform.root.gameObject.GetComponent.<AudioSource>();
                audio1.Play();
                GameObject.Find("player").GetComponent(health).DamageProtectObject(10);
           
            }
		}
}
	
      		