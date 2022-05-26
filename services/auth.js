export class Auth {
    constructor() {
        if (typeof Auth.instance === 'object') {
            return Auth.instance
        }

        this.userDataEl = document.querySelector('[data-user-info]')
        Auth.instance = this
        return Auth.instance
    }

    async auth(body) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const result = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        })
        const data = await result.json()
        console.log(data);
        if (data.ok) {
            const token = data.data.accessToken
            this.setToken(token)
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }


        return data
    }

    async reg(body) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const result = await fetch("http://localhost:5000/api/registration", {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        })
        const data = await result.json()

        if (data.ok) {
            const token = data.data.accessToken
            this.setToken(token)
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }

        return data
    }

    async me() {
        if (!this.getToken()) {
            return
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Bearer ${this.getToken()}`)

        const result = await fetch("http://localhost:5000/api/me", {
            method: 'GET',
            headers,
        })

        const data = await result.json()

        if (data.ok) {
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }
    }

    async logout() {
        localStorage.clear()
    }
    
    setToken(token) {
        localStorage.setItem('access-token', token)
    }

    removeToken(token) {
        localStorage.removeItem('access-token')
    }

    getToken() {
        return localStorage.getItem('access-token')
    }

    setUserInfo(user, clear) {
        const email = this.userDataEl.querySelector('[data-user-email]')
        const name = this.userDataEl.querySelector('[data-user-name]')
        const age = this.userDataEl.querySelector('[data-user-age]')

        email.innerText = clear ? '' : user.email
        name.innerText = clear ? '' : user.name
        age.innerText = clear ? '' : user.age
    }
}
