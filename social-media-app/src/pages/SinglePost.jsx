/* Imports */
import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/post/Post";
import CreateComment from "../components/comments/CreateComments";
import Comment from "../components/comments/Comment";



/* Single post function */
function SinglePost() {    
    /* Variables and constants */
    let {postId} = useParams(); // key/value pair of the dynamic params from the current URL
    const post = useSWR(`/post/${postId}/`, fetcher);
    const comments = useSWR(`/post/${postId}/comment/`, fetcher);
        


    /* Return */
    return(
        <Layout hasNavigationBack>
            {post.data ? (
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Post post={post.data} refresh={post.mutate} isSinglePost/>
                        <CreateComment postId={post.data.id} refresh={comments.mutate}/>
                        
                        {comments.data &&
                            comments.data.results.map((comment, index) => (
                                <Comment
                                    key={index}
                                    postId={post.data.id}
                                    comment={comment}
                                    refresh={comments.mutate}
                                />
                            ))
                        }
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
}



/* Exports */
export default SinglePost;


