export const LoginStart = (userCredentials) => ({
    type: "Login_START",
})

export const LoginSuccess = (user) => ({
    type: "Login_SUCCESS",
    payload: user,
})

export const LoginFailure = (error) => ({
    type: "Login_FAILURE",
    payload: error,
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});


// we can write any thing at place of payload but it is widely used