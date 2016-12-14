using UnityEngine;
using System.Collections;

public class ParticleSize : MonoBehaviour {
    private ParticleSystem psystem;
    private CircleCollider2D c;
    private int count;
    private bool inc;
    // Use this for initialization
    void Start () {
        psystem = GetComponent<ParticleSystem>();
        psystem.startSize = 1.0f;
        c = GetComponent<CircleCollider2D>();
        c.radius = 0.2f;
        count = 0;
    }
	
	// Update is called once per frame
	void Update () {
      
            psystem.startSize = psystem.startSize + 0.05f;
            c.radius = c.radius + 0.01f;
            count++;
  
            //Debug.Log("Particle system:"+psystem.startSize + "  " + c.radius);
      
	}
}
