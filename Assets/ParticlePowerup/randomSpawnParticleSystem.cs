using UnityEngine;
using System.Collections;

public class randomSpawnParticleSystem : MonoBehaviour {
    public GameObject particlePrefab1,particlePrefab2;
    public float minX;
    public float maxX;
    public float minY;
    public float maxY;
    public float  destroyTime;
    private float timer = 0;
    public float createInstance;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        timer = timer + Time.deltaTime;
        if(timer > createInstance)
        {
            GameObject particlePrefab;
            int choose = Random.Range(0, 10);
            if (choose > 5)
            {
                particlePrefab = particlePrefab1;
            }
            else
            {
                particlePrefab = particlePrefab1;
            }
            GameObject gameObject = (GameObject)Instantiate(particlePrefab, new Vector3(Random.Range(minX, maxX), Random.Range(minY, maxY), 0), Quaternion.identity);
            gameObject.AddComponent<ParticleSize>();
            Destroy(gameObject, destroyTime);
            timer = 0;

        }
   
    }
   
}
