



export function getToken() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Ingen token funnet – brukeren må logge inn");
    return token;
}
