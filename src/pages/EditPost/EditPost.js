import styles from "./EditPost.module.css"

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {


    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id)
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(",");
            setTags(textTags);
        }
    }, [post])

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError("");

        try {
            new URL(image)
        } catch {
            setFormError("The image needs to be an URL");
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !tags || !body) {
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
        <div className={styles.edit_post}>
            {post &&
                <>
                    <h2>Editing post: </h2>
                    <p> Edit the post as you wish</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Title: </span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Think in an a good title..."
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Image: </span>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="Insert an image that represents your post"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}> Current image preview: </p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
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
                </>}
        </div>
    );
};

export default EditPost;