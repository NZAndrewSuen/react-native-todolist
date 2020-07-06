class Config {
    static TestLoggedUserId = "XnOXJbRZHCbeIkWOmXA1"; // change your test user id here

    static GoogleSigninConfig = {
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId: "740748536660-cv601fcsfug91he9gri1klv92a4c9qbt.apps.googleusercontent.com",
    };
}

export default Config;