CREATE TABLE IF NOT EXISTS users (
    id int not null primary key AUTO_INCREMENT,
    email varchar(255) not null,
    name varchar(255) not null,
    role enum('normal', 'admin'),
    surname varchar(255) not null,
    username varchar(255) not null,
    password varchar(255)
);

CREATE TABLE IF NOT EXISTS posts (
    id int primary key AUTO_INCREMENT,
    user_id int not null,
    content varchar(255) not null,
    likes int not null,
    foreign key(user_id) references users(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id int primary key AUTO_INCREMENT,
    post_id int not null,
    content varchar(255) not null,
    foreign key(post_id) references posts(id)
);

CREATE TABLE IF NOT EXISTS friendships (
    user_id int references users(id),
    friend int references users(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    user_id int references users(id),
    session_id text not null
);
