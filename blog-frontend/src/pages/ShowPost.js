import React, { useState, useEffect } from 'react'
import posts from '../models/posts'
// import EditPost from './EditPost'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'

const ShowPost = () => {
    const [allPost, setAllPost] = useState([])

    const getPost = () => {
        posts.index()
            .then(data => {
                console.log(data)
                setAllPost(data)
            })
    }

    useEffect(() => {
        console.log('hit useEffect')
        getPost()
    }, [])

    const handleDestroy = (id) => {
        console.log(id)
        posts.delete(id)
            .then(data => {
                console.log(data)
                getPost()
            })
    }

    return (
        <div>
            <h1 className="title-h1">Post</h1>
            {allPost.length
                ? allPost.map((post, idx) => {
                    return <div className="Card">
                        <Card>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.body}
                                </Card.Text>
                                <Link to={{
                                    pathname: `/editpost/${post.id}`,
                                    state: post
                                    }}>
                                    <Button variant="primary">Edit</Button>
                                </Link>
                                <Button variant="primary" onClick={()=> handleDestroy(post.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                })
                : "loading"
            }
        </div>
    )
}

export default ShowPost


