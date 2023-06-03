// setSongScore(newScore)

import { getUser, updateUser } from "../Users/users.firebase";

// 1. get the currently logged in user info
// 2. get the user's current highScore for song
// 3. if newScore > current highScore => update the user's highscore

export async function setSongScore(newScore) {

    
    // get the currently logged in user info
    const user = await getUser();
    // READ ONLY
    let currentScore = user.highScore.song;

    if (newScore > currentScore) {
        // update the highScore on the database
        await updateUser({
            highScore: {
                song: newScore,
                quiz: user.highScore.quiz
            }
        })
    }
}

// setQuizScore(newScore)

// 1. get the currently logged in user info
// 2. get the user's current highScore for quiz
// 3. if newScore > current highScore => update the user's highscore

export async function setQuizScore(newScore) {
    // get the currently logged in user info
    const user = await getUser();
    // READ ONLY
    let currentScore = user.highScore.quiz;

    if (newScore > currentScore) {
        // update the highScore on the database
        await updateUser({
            highScore: {
                song: user.highScore.song,
                quiz: newScore
            }
        })
    }
}