using UnityEngine;
using System.Collections;

public class LoadOnClick : MonoBehaviour
{

    public GameObject loadingImage;

    public void LoadScene(int level)
    {
        Time.timeScale = 1;
        loadingImage.SetActive(true);
        Application.LoadLevel(level);
    }
}