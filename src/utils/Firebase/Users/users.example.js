// USER SCHEMA
// const user = {
//     email: "test@gmail.com",
//     firstName: "Test",
//     lastName: "User",
//     highScore: {
//         song: 0,
//         quiz: 0
//     },
//     bookmark: []
// }

export const createUser = ({
    email,
    firstName,
    lastName,
}) => {
    return {
        email,
        firstName,
        lastName,
        highScore: {
            song: 0,
            quiz: 0
        },
        bookmark: []
    }
}