/* Imports */
import React, {useState} from "react";
import {format} from "timeago.js";
import {LikeFilled, CommentOutlined, LikeOutlined, MoreOutlined} from "@ant-design/icons";
import { Image, Card, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { mutate } from "swr";
import Toaster from "../Toaster";
import { Link } from "react-router-dom";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import MoreToggleIcon from "../MoreToggleIcon";



/* Post function */
function Post(props) {
    /* Constants */
    const {post, refresh, isSinglePost} = props;
    const [showToast, setShowToast] = useState(false);
    const user = getUser();

    
    /* Handle like click */
    const handleLikeClick = (action) => {
        axiosService
            .post(`/post/${post.id}/${action}/`)

            .then(() => {
                // refresh function comes from SWR posts object. SWR returns an objec with a
                // mutate method that can be used to trigger the fetching of data.
                //refresh();
                mutate();
            })

            .catch((err) => console.error(err));
    };

    
    /* Handle delete */
    const handleDelete = () => {
        axiosService
            .delete(`/post/${post.id}/`)

            .then(() => {
                setShowToast(true);
                refresh();
            })

            .catch((err) => console.error(err));
    };



    /* Return */
    return (
        <>
            <Card className="rounded-3 my-4">
                <Card.Body>                                        
                    <Card.Title className="d-flex flex-row justify-content-between">
                        <div>                                         
                            <Image
                                src={post.author.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="me-2 border border-primary border-2"
                            />

                            <div className="d-flex 
                                            flex-column 
                                            justify-content-start 
                                            align-self-center 
                                            mt-2"
                            >                            
                                <p className="fs-6 m-0">
                                    {post.author.username}
                                </p>

                                <p className="fs-6 fw-lighter">
                                    <small>{format(post.created)}</small>
                                </p>
                            </div>
                        </div>
                        
                        {user.username === post.author.username && (
                            <div>                                                        
                                <Dropdown>                                    
                                    <Dropdown.Toggle as={MoreToggleIcon} />

                                    <Dropdown.Menu>
                                        <UpdatePost post={post} refresh={refresh}/>                                        
                                        <Dropdown.Item
                                            onClick={handleDelete}
                                            className="text-danger"
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Card.Title>

                    <Card.Text>
                        {post.body}
                    </Card.Text>
                        
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <LikeFilled
                                style={{
                                    color: "#fff",
                                    backgroundColor: "#0D6EFD",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "75%",
                                    padding: "2px",
                                    margin: "3px",
                                }}
                            />

                            <p className="ms-1 fs-6">
                                <small>{post.likes_count} like</small>
                            </p>
                        </div>

                        {!isSinglePost && (
                            <p className="ms-1 fs-6">
                                <small>                                    
                                    <Link to={`/post/${post.id}/`}>
                                        {post.comments_count} comments
                                    </Link>
                                </small>
                            </p>
                        )}
                    </div>
                </Card.Body>

                <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                    <div className="d-flex flex-row">
                        <LikeOutlined
                            style={{
                                width: "24px",
                                height: "24px",
                                padding: "2px",
                                fontSize: "20px",
                                color: post.liked ? "#0D6EFD" : "#C4C4C4",
                            }}
                            onClick={() => {
                                if (post.liked) {
                                    handleLikeClick("remove_like");
                                } else {
                                    handleLikeClick("like");
                                }     
                            }}
                        />

                        <p className="ms-1">
                            <small>Like</small>
                        </p>
                    </div>

                    <div className="d-flex flex-row">
                        <CommentOutlined
                            style={{
                                width: "24px",
                                height: "24px",
                                padding: "2px",
                                fontSize: "20px",
                                color: "#C4C4C4",
                            }}
                        />
                    </div>

                    {!isSinglePost && (
                        <div className="d-flex flex-row">
                            <CommentOutlined
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    padding: "2px",
                                    fontSize: "20px",
                                    color: "#C4C4C4",
                                }}
                            />

                            <p className="ms-1 mb-0">
                                <small>Comment</small>
                            </p>
                        </div>
                    )}
                </Card.Footer>
            </Card>
        </>
    )
}



/* Exports */
export default Post;


