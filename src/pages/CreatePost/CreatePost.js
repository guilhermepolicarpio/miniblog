import styles from "./CreatePost.module.css"

import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

    const [title, settitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError("");

        try{
            new URL(image)
        }catch{
            setFormError("The image needs to be an URL");
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if(!title || !image || !tags || !body){
            setFormError("Please, all fields must be filled")
        }

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        navigate("/");
    };
    
    console.log(response)

    return (
        <div className={styles.create_post}>
            <h2>CreatePost</h2>
            <p> Write about anything you want and share your knowledge</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>title: </span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Think in an a good title..."
                        onChange={(e) => settitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>image: </span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image that represents your post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Content: </span>
                    <textarea

                        name="body"
                        required
                        placeholder="Insert post content"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </label>
                <label>
                    <span>Tags: </span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insert tags separated by comma"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && <button className="btn"> Create Post</button>}
                {response.loading && (<button className="btn" disabled>Wait...</button>)}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;