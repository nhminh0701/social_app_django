import React from 'react';
import Posts from '../layouts/Posts'


export default function Dashboard() {
    document.title = "Dashboard"

    return (
        <div>
            <h1>Dashboard</h1>
            <Posts />
        </div>
    )
}
