$(async () => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const isUser = document.location.href.match(/[^\/]+$/)[0] == 'user.html'

    if (user.role == 'admin' && isUser) {
        window.location = "./admin.html"
    }
    if (user.role == 'normal' && !isUser) {
        window.location = "./user.html"
    }

    setPersonalData()
    handleEdit()
    await updateUsers()
    await updatePosts(isUser)
})

const handleEdit = () => {
    $(".edit-button").click(function () {
        const element = $(this).attr('class').split(' ')[0]

        if (isOnEdit(element)) {
            $(this).children('i').removeClass('fa-save').addClass('fa-edit')
            $(`input.${element}, select.${element}`).first().prop('disabled', true)
        }
        else {
            $(this).children('i').removeClass('fa-edit').addClass('fa-save')
            $(`input.${element}, select.${element}`).first().prop('disabled', false)
        }
    })
}

const fetchPosts = async () => {
    const sid = window.sessionStorage.getItem('sid')
    return axios.get('http://localhost:3000/post', { headers: { sid } })
}

const fetchUsers = async () => {
    const sid = window.sessionStorage.getItem('sid')
    return axios.get('http://localhost:3000/users', { headers: { sid } })
}

const updateUsers = async () => {
    const genRow = (id, user) => `
        <tr id="us-${user.id}">
            <th>${id}</th>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.email}</td>
            <td class="text-center">
                <button id="del-us-${user.id}" class="delete-button" type="button"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    `

    const genDelListener = (userId) => {
        const trashId = `#del-us-${userId}`
        const rowId = `#us-${userId}`
        const sid = window.sessionStorage.getItem('sid')

        $(trashId).click(async () => {
            try {
                const res = await axios.delete(
                    'http://localhost:3000/user',
                    { data: { id: userId }, headers: { sid } })
                console.log(res)
            }
            catch (e) {
                console.log(e)
                alert('Could not update db')
            }
            alert('Deleted user')
            $(rowId).remove()
        })
    }
    try {
        const users = (await fetchUsers()).data
        $('#ttl-users').text(users.length)

        for (const i in users) {
            const row = genRow(+i + 1, users[i])
            $("#users-table").first().append(row)
            genDelListener(users[i].id)
        }
    }
    catch(e) {
        console.error(e)
        alert('Cannot update users')
    }
}

const isOnEdit = (element) => {
    const classes = $(`.${element}`).children('i').last().prop('class')
    return classes.split(' ')[1] == 'fa-save'
}

const setPersonalData = () => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))

    $("#username-avatar").first().text(user.username)
    $("#personal-card .card-title").first().text(user.username)
    $("#personal-card .followers > p ").first().text(user.followers)
    $("#personal-card .following > p").first().text(user.followees)
}

const updatePosts = async (isUser) => {
    const genRow = (i, post) => `
        <tr id="row-${post.id}">
            <th>${i}</th>
            <td>${post.content.split(' ').slice(0, 5).join(' ') + '...'}</td>
            <td>${post.username}</td>
            <td>Justice</td>
            <td>
                <button id="del-${post.id}" class="delete-button" type="button"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>

    `
    const genDelListener = (postId) => {
        const trashId = `#del-${postId}`
        const rowId = `#row-${postId}`
        const sid = window.sessionStorage.getItem('sid')

        $(trashId).click(async () => {
            try {
                const res = await axios.delete(
                    'http://localhost:3000/post',
                    { data: { id: postId }, headers: { sid } })
            }
            catch (e) {
                console.log(e)
                alert('Could not update db')
            }
            $(rowId).remove()
        })
    }

    const user = JSON.parse(window.sessionStorage.getItem('user'))

    const posts = (await fetchPosts()).data.filter(p => p.username == user.username)
    if (isUser) {
        posts = posts.filter(p => p.username == user.username)
    }
    else {
        $('#ttl-posts').text(posts.length)
    }

    for (const i in posts) {
        $("#posts-table").append(genRow(+i + 1, posts[i]))
        genDelListener(posts[i].id)
    }
}