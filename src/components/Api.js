export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._token = options.token

    }
    _checkResponse(response) {
        if (response.ok) {
            return response.json();

        }

        return Promise.reject(`something goes wrong: ${response.status} ${response.statusText}`);


    }




    async getInitialCards() {

        const response = await fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        return this._checkResponse(response)





    }


    async getUserData() {
        const response = await fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })

        return this._checkResponse(response)

    }
    async uploadCard(name, link) {
        const response = await fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })

        return this._checkResponse(response)

    }
    async updatingProfileInfo(name, about) {
        const response = await fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })

        return this._checkResponse(response)
    }
    async updatingProfileImg(link) {
        const response = await fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link

            })
        })

        return this._checkResponse(response)
    }

    async deleteCard(cardId) {
        const response = await fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,

            }
        })

        return this._checkResponse(response)

    }
    async likeCard(cardId) {
        const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
        })

        return this._checkResponse(response)
    }
    async removeLikeCard(cardId) {
        const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },

        })

        return this._checkResponse(response)
    }

}
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "61a577b5-41b8-4f4a-b2cc-045694a09d23"
});
export { api }







