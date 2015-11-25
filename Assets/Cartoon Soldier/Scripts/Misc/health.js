import UnityEngine.UI;
var health : float;
var healthSlider : Slider;                                  // Reference to the UI's health bar.
var damageSlider : Slider;
var damageImage : Image;                                    // Reference to an image to flash on the screen on being hurt.
var deathClip : AudioClip;                                  // The audio clip to play when the player dies.
var flashSpeed : float= 5f;                             // The speed the damageImage will fade at.
var flashColour : Color = new Color(1f, 0f, 0f, 0.5f);      // The colour the damageImage is set to, to flash.
var winText: GameObject;
var loseText: GameObject;
var scoreText: Text;
var timeText: Text;
var toMenuButton: GameObject;
var instantScoreText: Text;

var enemy : GameObject;                // The enemy prefab to be spawned.
var enemy2 : GameObject;
var spawnTime : float = 3f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this enemy can spawn from.
var secondNumber : float;


var protectHealth:float;
var protectObject: GameObject;



private var lastHitTime : float;
private var hitDirection : Vector3;
private var recoilDirecion : Vector3;
private var deathTime : float;
private var alive : boolean = true;
private var previousHealth : float;
private var score : float = 0f;
private var enemyNumber: float = 0f;
private var killNumber: float = 0f;
private var isGameEnd: boolean = false;


function Start() {
    previousHealth = health;
    InvokeRepeating ("Spawn", spawnTime, spawnTime);
    InvokeRepeating ("countTime", 1f, 1f);
}

function Update(){
    instantScoreText.text = "Score  " + score;
    timeText.text = "Time  " + secondNumber;
    healthSlider.value = health;
    damageSlider.value = protectHealth;
    //Debug.Log("health: " + health + " , previous: " + previousHealth);
    if (health < previousHealth) {
        damageImage.color = flashColour;
        previousHealth = health;

    } else if (alive) {
        // ... transition the colour back to clear.
        damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
    }
	if( health <= 0 && alive){
		Screen.lockCursor = false;
		Cursor.visible = true;
	    alive = false;
	    deathTime = Time.time;
	    loseText.SetActive(true);
	    scoreText.text = "Score  " + (score + protectHealth);
	    scoreText.gameObject.SetActive(true);
		toMenuButton.SetActive(true);

	}
	if (protectHealth <=0 && alive) {
		Screen.lockCursor = false;
		Cursor.visible = true;
	    damageImage.color = flashColour;
	    alive = false;
	    loseText.SetActive(true);
	    scoreText.text = "Score  " + (score + protectHealth);
	    scoreText.gameObject.SetActive(true);
	    toMenuButton.SetActive(true);
	    Time.timeScale = 0;
	}

	if (alive && secondNumber == 0 && protectHealth > 0 && !isGameEnd) {
		Screen.lockCursor = false;
		Cursor.visible = true;
	    winText.SetActive(true);
	    scoreText.text = "Score  " + (score + protectHealth);
	    scoreText.gameObject.SetActive(true);
	    toMenuButton.SetActive(true);
	    isGameEnd = true;
	    Time.timeScale = 0;
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

 function SetScore(score: float) {
     this.score += score;
 }

     function Spawn ()
     {
         // If the player has no health left...
         if(health <= 0f || secondNumber == 0 || !alive)
         {
             // ... exit the function.
             return;
         }

         // Find a random index between zero and one less than the number of spawn points.
         var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);

         // Create an instance of the enemy prefab at the randomly selected spawn point's position and rotation.

         if (Random.Range(0, 10) > 5)
         {
             Instantiate (enemy, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
         }
         else {
             Instantiate (enemy2, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
         }
         
         enemyNumber++;
     }
     function countTime() {
         if (secondNumber == 0 || !alive) {
             return;
         }
         secondNumber --;
     }

     function increaseKillNumber(number: float) {
         this.killNumber += number;
     }

         function DamageProtectObject (number: float) {
             this.protectHealth -= number;
         }