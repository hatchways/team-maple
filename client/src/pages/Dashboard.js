import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";

const Dashboard = ({ logoutUser, user }) => {
    const handleClick = () => {
        logoutUser();
    }
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const handleFileChange = e => {
        const uploadFile = e.target.files[0];
        setFile(uploadFile);
    }
    const handleFileUpload = async () => {
        const uploadConfig = await axios.get("/upload");
        setAuthToken();
        await axios.put(uploadConfig.data.url, file, {
            headers: {
                "Content-type": file.type,
                "Cache-Control": "public, max-age=31536000",
            },
        })
        setImageUrl(uploadConfig.data.key);
        setAuthToken(tokenStorage.getAuthToken());
    }
    return (
        <div>
            This is the dashboard
            <button onClick={handleClick}>Logout</button>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleFileUpload}>Upload</button>
            { imageUrl && <img src={`${process.env.REACT_APP_S3_URL}/${imageUrl}`}></img> }
        </div>
    );
}

export default connect(null, { logoutUser })(Dashboard);