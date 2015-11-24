using UnityEngine;
using System.Collections;
using Pathfinding;
using UnityEngine.UI;

public class AutoFollow : AIPath {
    /** Animation component.
             * Should hold animations "awake" and "forward"
             */
    public Animation anim;

    /** Minimum velocity for moving */
    public float sleepVelocity = 0.4F;

    /** Speed relative to velocity with which to play animations */
    public float animationSpeed = 0.2F;

    /** Effect which will be instantiated when end of path is reached.
     * \see OnTargetReached */
    public GameObject endOfPathEffect;
    public AudioClip[] wooshsounds;
    public AudioSource myaudiosource;


    public new void Start()
    {

        //Prioritize the walking animation
        anim["runneutral"].layer = 10;

        //Play all animations
        anim.Play("idle");
        anim.Play("runneutral");

        //Setup awake animations properties
        anim["idle"].wrapMode = WrapMode.Clamp;
        anim["idle"].speed = 0;
        anim["idle"].normalizedTime = 1F;

        //Call Start in base script (AIPath)
        base.Start();
    }

    /** Point for the last spawn of #endOfPathEffect */
    protected Vector3 lastTarget;

    /**
     * Called when the end of path has been reached.
     * An effect (#endOfPathEffect) is spawned when this function is called
     * However, since paths are recalculated quite often, we only spawn the effect
     * when the current position is some distance away from the previous spawn-point
    */
    public override void OnTargetReached()
    {

        if (endOfPathEffect != null && Vector3.Distance(tr.position, lastTarget) > 1)
        {
            GameObject.Instantiate(endOfPathEffect, tr.position, tr.rotation);
            lastTarget = tr.position;

        }
        Slider hpSlider = GameObject.Find("Health bar").GetComponent<Slider>();
        if (hpSlider.value > 0)
        {
            switch (Random.Range(0, 2))
            {
                case 0:
                    anim.PlayQueued("attack1left", QueueMode.CompleteOthers);
                    //anim.Play("attack1left");
                    break;
                case 1:
                    anim.PlayQueued("attack2right", QueueMode.CompleteOthers);
                    //anim.Play("attack2right");
                    break;
                case 2:
                    anim.PlayQueued("attack3front", QueueMode.CompleteOthers);
                    //anim.Play("attack3front");
                    break;
            }
            //myaudiosource.clip = wooshsounds[Random.Range(0, 3)];
            //myaudiosource.pitch = 0.98f + 0.1f * Random.value;
            //myaudiosource.Play();
        }
        else {
            while (anim.IsPlaying("attack1left") || anim.IsPlaying("attack2right") || anim.IsPlaying("attack3front"))
                anim.Stop();
        }








    }

    public override Vector3 GetFeetPosition()
    {
        return tr.position;
    }

    protected new void Update()
    {

        //Get velocity in world-space
        Vector3 velocity;
        if (canMove)
        {

            //Calculate desired velocity
            Vector3 dir = CalculateVelocity(GetFeetPosition());

            //Rotate towards targetDirection (filled in by CalculateVelocity)
            RotateTowards(targetDirection);

            dir.y = 0;
            if (dir.sqrMagnitude > sleepVelocity * sleepVelocity)
            {
                //If the velocity is large enough, move
            }
            else
            {
                //Otherwise, just stand still (this ensures gravity is applied)
                dir = Vector3.zero;
            }

            if (navController != null)
            {
                velocity = Vector3.zero;
            }
            else if (controller != null)
            {
                controller.SimpleMove(dir);
                velocity = controller.velocity;
            }
            else
            {
                Debug.LogWarning("No NavmeshController or CharacterController attached to GameObject");
                velocity = Vector3.zero;
            }
        }
        else
        {
            velocity = Vector3.zero;
        }


        //Animation

        //Calculate the velocity relative to this transform's orientation
        Vector3 relVelocity = tr.InverseTransformDirection(velocity);
        relVelocity.y = 0;

        if (velocity.sqrMagnitude <= sleepVelocity * sleepVelocity)
        {
            //Fade out walking animation
            anim.Blend("runneutral", 0, 0.2F);
        }
        else
        {
            //Fade in walking animation
            anim.Blend("runneutral", 1, 0.2F);

            //Modify animation speed to match velocity
            AnimationState state = anim["runneutral"];

            float speed = relVelocity.z;
            state.speed = speed * animationSpeed;
        }
    }

}
