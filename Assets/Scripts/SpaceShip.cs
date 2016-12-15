using UnityEngine;
using System.Collections;



public class SpaceShip : MonoBehaviour
{

    public GameObject rayLandingPad1, aircraft, ship;
    int count, activeCount;
    private ArrayList randomLandingPadPositions;


    // Use this for initialization
    void Start()
    {

        count = 0;
        activeCount = 0;
        randomLandingPadPositions = new ArrayList();

        randomLandingPadPositions.Add(new Vector3(0, 3.5f, 0));
        randomLandingPadPositions.Add(new Vector3(37,3.5f, 0));


    }

    // Update is called once per frame
    void Update()
    {


        if (count % 100 != 0)
        {
            count++;
        }
        else if (count % 100 == 0 || activeCount != 0)
        {
            activeCount++;
            if (activeCount < 500)
            {
                rayLandingPad1.SetActive(true);
            }
            else
            {
                randomLandingPadPositions.Add(new Vector3(rayLandingPad1.transform.position.x, rayLandingPad1.transform.position.y, rayLandingPad1.transform.position.z));
                rayLandingPad1.SetActive(false);
                rayLandingPad1.transform.position = (Vector3)randomLandingPadPositions[0];
                randomLandingPadPositions.RemoveAt(0);
                Debug.Log(activeCount);
                activeCount = 0;
                count++;
                createShip();
            }

        }


    }

    void createShip()
    {
        Debug.Log("Inside createShip");
        GameObject newShipInstance = (GameObject)Instantiate(ship, new Vector3(-19, 5,0), Quaternion.identity);
        newShipInstance.SetActive(true);
    }

}