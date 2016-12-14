using System;

public class GlobalClass
{
    private static int totalScore = 0;

	public GlobalClass()
	{
	}

    public static void updateScore()
    {
        totalScore += 1;
    }

    public static int getScore()
    {
        return totalScore;
    }


}
