$(async () => {
    if (!window.sessionStorage.getItem('user')) {
        window.location = './login.html'
        return
    }

    const user = JSON.parse(window.sessionStorage.getItem('user'))

    await updatePosts()
    setPersonalData(user)
    await handlePostSubmission()
})

const clearPosts = () => {
    $('#posts').empty()
}

const updatePosts = async () => {
    clearPosts()
    await createInputForm()
    const sid = window.sessionStorage.getItem('sid')
    const posts = await fetchPosts()

    for (post of posts.data) {
        console.log('here')
        addPost(post.username, post.content)
    }
}

const fetchPosts = async () => { 
    const sid = window.sessionStorage.getItem('sid')

    return axios.get('http://localhost:3000/post', { headers: { sid } })
}

const handlePostSubmission = async () => {
    const sid = window.sessionStorage.getItem('sid')
    const postForm = $('form[name="post"] submit')[0]

    $(postForm).click(async () => {
        const text = $('#post-compose').first().val()
        try {
            const res = await axios.post('http://localhost:3000/post', { content: text }, { headers: { sid } })
            alert('Post added')
            await updatePosts()
        }
        catch (e) {
            alert('Unauthorized request')
        }
    })
}

const addPost = (username = "userlala", content = "this is a post") => {
    const html = `
        <div class="card">
            <div class="row">
                <div class="col-sm-1 feed-avatar">
                    <img alt="avatar" src="./photos/avatar.jpg" class="avatar">
                </div>
                <div class="col-sm">
                    <p>${username}</p>
                    <p class="post-paragraphs">${content}</p>
                    <div class="btn-post">
                        <button class="fas fa-thumbs-up"></button>
                    </div>
                    <div class="btn-post">
                        <button class="fas fa-comments"></button>
                    </div>
                    <div class="btn-post">
                        <button class="fas fa-share"></button>
                    </div>
                </div>
            </div>
        </div>
    `

    $('#posts').append(html)
}

const createInputForm = async () => {
    const html = `
        <div class="card" id="compose">
            <div class="row">
            <div class="col-sm-1 feed-avatar text-center">
                <img alt="avatar" src="./photos/avatar.jpg" class="avatar">
            </div>
            <div class="col-sm text-center">
                <form name="post">
                <div class="form-group">
                    <textarea class="form-control" rows="8" id="post-compose" placeholder="What are you thinking..."> </textarea>
                </div>
                <submit class="btn btn-primary active" role="button" aria-pressed="true">Post</submit>
                </form>
            </div>
            </div>
        </div>
    `

    $('#posts').append(html)
    await handlePostSubmission()
}
const setPersonalData = (user) => {
    $("#username-avatar").first().text(user.username)
    $("#personal-card .card-title").first().text(user.username)
    $("#personal-card .followers > p ").first().text(user.followers)
    $("#personal-card .following > p").first().text(user.followees)
}