using UnityEngine;
using System.Collections;



public class SpaceShip : MonoBehaviour {

    public GameObject rayLandingPad1, aircraft;
    int count, activeCount;
    // Use this for initialization
    void Start () {

        count = 1;
        activeCount = 0;

    }
	
	// Update is called once per frame
	void Update () {


        if (count%100 != 0)
        {
            count++;
            rayLandingPad1.SetActive(false);
        }
        else if (count%100 == 0 || activeCount != 0)
        {
            activeCount++;
            if (activeCount < 500)
            {
                rayLandingPad1.SetActive(true);
            }    
            else
            {
                Debug.Log(activeCount);
                activeCount = 0;
                count++;
            }

        }
            

    }
}
