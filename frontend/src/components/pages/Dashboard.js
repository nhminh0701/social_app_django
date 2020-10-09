import React from 'react';
import Posts from '../layouts/Posts';
import PostCreateForm from '../layouts/PostForm';


export default function Dashboard() {
    document.title = "Dashboard"

    return (
        <div>
            <PostCreateForm />
            <br></br>
            <Posts />
        </div>
    )
}
