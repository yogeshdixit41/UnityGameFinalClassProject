using UnityEngine;
using System.Collections;



public class SpaceShip : MonoBehaviour
{

    public GameObject rayLandingPad1, aircraft, blueShipPrefab, whiteShipPrefab;
    int count, activeCount;
    private ArrayList randomLandingPadPositions, randomChildShipPositions;
    bool selectBluePrefab;


    // Use this for initialization
    void Start()
    {

        count = 0;
        activeCount = 0;
        randomLandingPadPositions = new ArrayList();
        randomChildShipPositions = new ArrayList();
        selectBluePrefab = true; // will select first spawned ship to be blue

        randomLandingPadPositions.Add(new Vector3(0, 3.5f, 0));
        randomLandingPadPositions.Add(new Vector3(-37,3.5f, 0));

        randomChildShipPositions.Add(new Vector3(-16, -13, 0));
        randomChildShipPositions.Add(new Vector3(-31, 5, 0));
        randomChildShipPositions.Add(new Vector3(16, -10, 0));
        randomChildShipPositions.Add(new Vector3(3, -13, 0));


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
        GameObject newShipInstance;

        Vector3 position = (Vector3)randomChildShipPositions[0];
        randomChildShipPositions.RemoveAt(0);
        randomChildShipPositions.Add(position);

        Debug.Log("Inside createShip");
        if (selectBluePrefab)
        {
            newShipInstance = (GameObject)Instantiate(blueShipPrefab, position, Quaternion.identity);
            selectBluePrefab = false;
        }
        else
        {
            newShipInstance = (GameObject)Instantiate(whiteShipPrefab, position, Quaternion.identity);
            selectBluePrefab = true;
        }
        
        newShipInstance.SetActive(true);
    }

}