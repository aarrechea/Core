/* Imports */
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import { fetcher } from "../helpers/axios";
import { Row, Col } from "react-bootstrap";



/* Edit profile function */
function EditProfile() {
    /* Constants */
    const {profileId} = useParams();
    const profile = useSWR(`/user/${profileId}/`, fetcher);

    

    /* Return */
    return (
        <Layout hasNavigationBack>
            {profile.data ? (
                <Row className="justify-content-evenly">
                    <Col sm={9}>
                        <UpdateProfileForm profile={profile.data}/>
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
        </Layout>    
    );
}



/* Exports */
export default EditProfile;


