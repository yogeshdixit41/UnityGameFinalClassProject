#pragma strict
import UnityEngine.SceneManagement;
private var dragging : boolean = false; 
private var moving : boolean = false; 
private var dead : boolean = false;
private var movingDown : boolean = false;
private var countDrag : int = 0; 
private var countMove : int = 0;
private var mousePosition : Vector3; 
private var mousePoint : Vector3; 
private var pointCurrent : Vector3; 
private var pointStore : Vector3; 
private var posStoreX : Array = []; 
private var posStoreY : Array = []; 
private var arrayPathMarker : GameObject[] = new GameObject[1000];
private var totalScore : int;

var objectPathMarker : GameObject; 
var start : Quaternion;
var target : Quaternion;
var time:float=0.0f;
var slope : float;
var speed: float;
var rb : Rigidbody2D;
var angle : float;
var movement: Vector3;
var anim: Animator;
var sr: SpriteRenderer;
var v: Vector3 = new Vector3(0.5,0.3,0);
function Start () { 
    dragging = false; 
    anim = GetComponent("Animator");
    sr = GetComponent("SpriteRenderer");
    rb = GetComponent("Rigidbody2D");

    totalScore = 0;
} 

function Update () { 

	// note - raycast needs a surface to hit against 
	var rayHit : RaycastHit; 
	if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), rayHit)) {

		// where did the raycast hit in the world - position of rayhit 
		if (dragging) {
			//print ("rayHit.point : " + rayHit.point + " (mousePoint)");
		}
		mousePoint = rayHit.point;
		if (Input.GetMouseButtonDown(0)) { 
			OnTouchBegin(mousePoint); 
		} 
		else if (Input.GetMouseButton(0)) {
	 		OnTouchMove(mousePoint); 
		} 
		else if (Input.GetMouseButtonUp(0)) {
  			OnTouchEnd(mousePoint); 
		} 
	} 
} 

function OnTouchBegin (pointCurrent : Vector3) {
    
    var _currentPos: Vector3;
    _currentPos= transform.position;
    var diff:Vector3;
    diff= pointCurrent-_currentPos;
    var distance :float;
    distance = Mathf.Sqrt(diff.x*diff.x + diff.y*diff.y);
    if (distance<1){
        countDrag = 0; posStoreX.Clear(); 
        posStoreY.Clear(); 
        countMove = 0;
        DestroyAllPathMarkers();
        AddSplinePoint(pointCurrent);
        dragging = true; 
        moving = false;
    }
}

function OnTouchMove (pointCurrent : Vector3) {

    if ((dragging) && (countDrag < 1000)) {
	    //print("countDrag " + countDrag); 
        AddSplinePoint(pointCurrent); 
    } 
    else if (dragging) { 
        dragging = false; moving = true;
   } 
} 

function OnTouchEnd (pointCurrent : Vector3) { 

    dragging = false;
    moving = true; 
} 

function AddSplinePoint (pointStore : Vector3) {
 	
 	// store co-ordinates 
    posStoreX[countDrag] = pointStore.x; 
    posStoreY[countDrag] = pointStore.y; 
    
    // show path : Instantiate and load position into array as gameObject 
    arrayPathMarker[countDrag] = Instantiate(objectPathMarker, Vector3(pointStore.x, pointStore.y,0), transform.rotation); 
    //print (arrayPathMarker[countDrag].transform.position); 
    
    // next position 
    countDrag ++; 
} 

function FixedUpdate () { 
	
    if (dead)
    {
        if (anim.GetBool("Explode") == false)
        {
            StartCoroutine("Die");
        }            
        return;
    }
	// move gameObject 
    if (moving) {
        anim.SetBool("Idle",false);
    
    // remove path marker 
    Destroy (arrayPathMarker[countMove]); 
    
    if(posStoreX.length > 0) {
        movingDown = false;
        // move gameObject along path 
        movement = new Vector3(posStoreX[countMove], posStoreY[countMove],0);
        var angle : float;
        angle = Mathf.Atan((movement.y-transform.position.y )/(movement.x - transform.position.y)) *180/Mathf.PI ;
        if (angle > 180)
            angle = angle-180;
        if (angle < -180)
            angle = angle + 180;
        if (movement.y > transform.position.y)
        {
            anim.SetTrigger("Up");
            anim.ResetTrigger("Down");
            anim.SetBool("Idle",false);
        }
        else if (movement.y < transform.position.y)
        {
            anim.SetTrigger("Down");
            anim.ResetTrigger("Up");
            anim.SetBool("Idle",false);
        }
        else
        {
            anim.SetBool("Idle",true);
            anim.ResetTrigger("Down");
            anim.ResetTrigger("Up");
        }
        if (movement.x > transform.position.x)
            sr.flipX = false;
        else if (movement.x < transform.position.x)
            sr.flipX = true;
        transform.position=movement;
        countMove ++; 
    }

    //print("X length :" + posStoreX.length);
    
    if (countMove >= posStoreX.length) {
        moving = false;
        posStoreX.Clear();
        posStoreY.Clear();
        dragging=false;
    }

    // stop at end of path 
   }
   else { 
        if (dragging) {
            rb.velocity = new Vector3(0,0,0);
            anim.SetBool("Idle",true);
            anim.ResetTrigger("Down");
            anim.ResetTrigger("Up");
            return;
        }
        DestroyAllPathMarkers();
        countMove = 0;
        var vel = v;
        if (sr.flipX)
            vel.x = vel.x*-1;
        if (anim.GetBool("Down") == true)
            movingDown = true;
        if (movingDown)
            vel.y = vel.y*-1;
        rb.velocity = vel;
        sr.flipX = vel.x < 0;
        if (vel.y>0)
        {
            anim.SetTrigger("Up");
            anim.ResetTrigger("Down");
            anim.SetBool("Idle",false);
        }
        else if (vel.y < 0)
        {
            anim.SetTrigger("Down");
            anim.ResetTrigger("Up");
            anim.SetBool("Idle",false);
        }
        else if (vel.y == 0)
        {
            anim.SetBool("Idle",true);
            anim.ResetTrigger("Down");
            anim.ResetTrigger("Up");
        }
   } 
   
   if (Input.GetKeyDown("r")) {
         //print ("posStoreX "+posStoreX+" : posStoreY "+posStoreY);
   }
}

/*
function OnCollisionEnter(coll : Collision) {
    if (coll.gameObject.tag =="MShip"){
        dead=true;
        rb.velocity = new Vector3(0,0,0);
        anim.SetBool("Idle",false);
        anim.ResetTrigger("Down");
        anim.ResetTrigger("Up");
        anim.SetTrigger("Explode");

    }
}*/

function OnCollisionEnter2D(coll : Collision2D) {
    var audio: AudioSource = GetComponent.<AudioSource>();
    if (coll.gameObject.tag == "Player") {
        dead = true;
        rb.velocity = new Vector3(0,0,0);
        anim.SetBool("Idle",false);
        anim.ResetTrigger("Down");
        anim.ResetTrigger("Up");
        anim.SetTrigger("Explode");
        audio.Play();
    }
    else if (coll.gameObject.tag == "VWall") {
        rb.velocity.x = rb.velocity.x *-1;
        sr.flipX = !sr.flipX;
    }
    else if (coll.gameObject.tag == "HWall") {
        rb.velocity.y = rb.velocity.y *-1;
        movingDown = !movingDown;
        anim.ResetTrigger("Down");
    }
    else if (coll.gameObject.tag =="MShip"){
        dead=true;
        rb.velocity = new Vector3(0,0,0);
        anim.SetBool("Idle",false);
        anim.ResetTrigger("Down");
        anim.ResetTrigger("Up");
        anim.SetTrigger("Explode");
        audio.Play();

    }
    else if (coll.gameObject.tag =="upperBorder"){
        dead=true;
        rb.velocity = new Vector3(0,0,0);
        anim.SetBool("Idle",false);
        anim.ResetTrigger("Down");
        anim.ResetTrigger("Up");
        anim.SetTrigger("Explode");
        audio.Play();

    }
    else if(coll.gameObject.tag == "landingPad")
    {
        updateScore();
        DestroyAllPathMarkers();
        Destroy(gameObject);
        //anim.SetTrigger("Explode");
    }
}

    function Die() {
    
    DestroyAllPathMarkers();
    yield WaitForSeconds (1);
    SceneManager.LoadScene(3);
    Destroy(gameObject);
}

function DestroyAllPathMarkers() {
    for (var i=0; i<1000; i++)
        Destroy(arrayPathMarker[i]);
}


/**
Updatescore: increments the score by 1
**/
function updateScore()
{
    //motherShip.setScore( motherShipInstance.getScore + 1);
    //GlobalClass.updateScore();
    //Debug.Log("Updated Score : " + GlobalClass.getScore());

}


function createNewShip()
{
    var newInstance : GameObject;
    var newposition : Vector3 = new Vector3 (-16,3,0);
    newInstance = GameObject.Instantiate(gameObject, newposition, Quaternion.identity);
    newInstance.SetActive(true);
}