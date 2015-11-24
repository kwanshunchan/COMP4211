using UnityEngine;
using System.Collections;

public class hideCursor : MonoBehaviour {

	// Update is called once per frame
	void Update () {
		//Cursor.visible = false;
		Cursor.visible = false;
		Screen.lockCursor = true;
	}
}
