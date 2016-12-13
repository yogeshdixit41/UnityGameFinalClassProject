#pragma strict



private var dragging : boolean = false; 

private var moving : boolean = false; 

private var countDrag : int = 0; 

private var countMove : int = 0;

public var moveSpeed = 0.1;

private var mousePosition : Vector3; 

private var mousePoint : Vector3; 

private var pointCurrent : Vector3; 

private var pointStore : Vector3; 

private var posStoreX : Array = []; 

private var posStoreY : Array = []; 

private var arrayPathMarker : GameObject[] = new GameObject[1000]; 

var objectPathMarker : GameObject; 

var start : Quaternion;

var target : Quaternion;

var time:float=0.0f;

var slope : float;

var speed: float;

var rb : Rigidbody2D;

var angle : float;

var movement: Vector3;

function Start () { 

    dragging = false; 

 

} 



function LateUpdate() {



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

        AddSplinePoint(pointCurrent);

        dragging = true; 

        moving = false;

    }

}



function OnTouchMove (pointCurrent : Vector3) {



    if ((dragging) && (countDrag < 1000)) {

	    print("countDrag " + countDrag); 

        AddSplinePoint(pointCurrent); 

    } 

    else { 

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

    print (arrayPathMarker[countDrag].transform.position); 

    

    // next position 

    countDrag ++; 

} 

    function LastUpdate(){



    }

function FixedUpdate () { 

	

	// move gameObject 

    if (moving) {

    

    // remove path marker 

    Destroy (arrayPathMarker[countMove]); 

    

    if(posStoreX.length > 0) {

        // move gameObject along path 

        movement = new Vector3(posStoreX[countMove], posStoreY[countMove],0);
        //movement = Vector2.Lerp(transform.position, mousePosition, moveSpeed);
        transform.position=movement;

        //rb.AddForce(movement * speed);

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

    

    countMove = 0; 

   } 

   

   if (Input.GetKeyDown("r")) {

         print ("posStoreX "+posStoreX+" : posStoreY "+posStoreY);

   }

}