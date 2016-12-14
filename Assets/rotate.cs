using UnityEngine;
using System.Collections;

public class rotate : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        MeshRenderer mr = GetComponent<MeshRenderer> ();
		Material m = mr.material;
		Vector2 offset = m.mainTextureOffset;
		offset.x += Time.deltaTime / 100f;
		offset.y += Time.deltaTime / 200f;
		m.mainTextureOffset = offset;
        if(offset.x == 0.6)
        {
            offset.x = 0.1f;
            offset.y = 0.1f;

        }
        //transform.Rotate(new Vector3(0, 0,30) * Time.deltaTime);
    }
}
