/*using UnityEngine;
using System.Collections;



public class SpaceShip : MonoBehaviour
{

    public GameObject rayLandingPad1,rayLandingPad2, aircraft;
    int count, activeCount;
    // Use this for initialization
    void Start()
    {

        count = 1;
        activeCount = 0;

    }

    // Update is called once per frame
    void Update()
    {


        if (count % 50 != 0)
        {
            count++;
            rayLandingPad1.SetActive(false);
            rayLandingPad2.SetActive(false);
        }
        else if (count % 50 == 0 || activeCount != 0)
        {
            activeCount++;
            if (activeCount < 300)
            {
                rayLandingPad1.SetActive(true);
                rayLandingPad2.SetActive(true);
            }
            else
            {
                Debug.Log(activeCount);
                activeCount = 0;
                count++;
            }

        }


    }
}*/
using UnityEngine;
using System.Collections;



public class SpaceShip : MonoBehaviour
{

    public GameObject rayLandingPad1, aircraft;
    int count, activeCount;
    private ArrayList randomLandingPadPositions;

    // Use this for initialization
    void Start()
    {

        count = 0;
        activeCount = 0;
        randomLandingPadPositions = new ArrayList();


        randomLandingPadPositions.Add(new Vector3(-35, 3.5f, 0));
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
            }

        }


    }
}