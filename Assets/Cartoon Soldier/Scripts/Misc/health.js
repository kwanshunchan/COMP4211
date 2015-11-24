import UnityEngine.UI;
var health : float;
var healthSlider : Slider;                                  // Reference to the UI's health bar.
var damageImage : Image;                                    // Reference to an image to flash on the screen on being hurt.
var deathClip : AudioClip;                                  // The audio clip to play when the player dies.
var flashSpeed : float= 5f;                             // The speed the damageImage will fade at.
var flashColour : Color = new Color(1f, 0f, 0f, 0.5f);      // The colour the damageImage is set to, to flash.
var winText: GameObject;
var loseText: GameObject;
var scoreText: GameObject;
var toMenuButton: GameObject;



private var lastHitTime : float;
private var hitDirection : Vector3;
private var recoilDirecion : Vector3;
private var deathTime : float;
private var alive : boolean = true;
private var previousHealth : float;


function Start() {
    previousHealth = health;
}

function Update(){
    healthSlider.value = health;
    //Debug.Log("health: " + health + " , previous: " + previousHealth);
    if (health < previousHealth) {
        damageImage.color = flashColour;
        previousHealth = health;
    } else if (alive) {
        // ... transition the colour back to clear.
        damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
    }
	if( health <= 0 && alive){
	    alive = false;
	    deathTime = Time.time;
		loseText.SetActive(true);
		scoreText.SetActive(true);
		toMenuButton.SetActive(true);

	}
	if (health > 0){
		alive = true;
	}
	health = Mathf.Max(health, 0);
}

function SetLastHitTime(){
	lastHitTime = Time.time;
}

function SetLastHitTime(setTime : float){
	lastHitTime = setTime;
}

function GetLastHitTime() : float{
	return lastHitTime;
}

function SetHitDirection(direction : Vector3){
	hitDirection = direction;
}

function GetHitDirection() : Vector3{
	return hitDirection;
}

function SetrecoilDirecion(direction : Vector3){
	recoilDirecion = direction;
}

function GetrecoilDirecion() : Vector3{
	return recoilDirecion;
}

function GetDeathTime() : float{
	return deathTime;
}

function SetHealth(newHealth : float){
	health = newHealth;
}

function GetHealth() : float{
	return health;
}

function Damage(damage:float)
 {
     health -= damage;

 }
