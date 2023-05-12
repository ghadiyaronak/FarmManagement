class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage?.getItem("user") as string) || null;
        return user?.refresh_token;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage?.getItem("user") as string) || null;
        return user?.access_token;
    }

    updateLocalAccessToken(token: string) {
        let user = JSON.parse(localStorage?.getItem("user") as string) || null;
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage?.getItem("user") as string) || null;
    }

    setUser(user: any) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();
