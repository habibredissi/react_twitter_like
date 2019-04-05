import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:3000/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log('Registered!')
        })
}

export const login = user => {
    return axios
        .post('http://localhost:3000/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteUser = userId => {
    return axios
        .delete('http://localhost:3000/users/' + userId, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log('User deleted!');
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateUser = updateUser => {
    return axios
        .put('http://localhost:3000/users/' + updateUser.userId, {
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            email: updateUser.email,
        }, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
}

export const userList = () => {
    return (axios
        .get('http://localhost:3000/users/', {
            headers: {
                Authorization: localStorage.usertoken
            }
        }))
}

export const followUser = (userId, followingUser) => {

    return axios
        .put('http://localhost:3000/users/follow/' + userId, {
            followingUser: followingUser
        }, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log('Follower added!');
        })
}

export const unfollowUser = (userId, followingUser) => {
    return axios
        .put('http://localhost:3000/users/unfollow/' + userId, {
            followingUser: followingUser
        }, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log('Unfollowed!');
        })
}

export const blockUser = (userId, blockedUser) => {
    return axios
        .put('http://localhost:3000/users/block/' + userId, {
            blocked: blockedUser
        })
        .then(res => {
            console.log('User blocked!')
        })
}