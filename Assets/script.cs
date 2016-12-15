using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class script : MonoBehaviour
{

    private int totalScore;
    public Text scoreText;

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        scoreText.text = "Score : "+totalScore;
    }

    public void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            totalScore += 1;
            Debug.Log(totalScore);
           
        }
    }
}
