import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;

    const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

    const deleteDocument = (id) => {

    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Manage your posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>No found posts</p>
                    <Link to="/posts/create" className="btn">
                        Create first post
                    </Link>
                </div>
            ) : (

                <>
                    <div className={styles.post_header}>
                        <span>Title</span>
                        <span>Actions</span>
                    </div>
                    {posts && posts.map((post) =>
                        <div key={post.div} className={styles.post_row}>
                            <p>{post.title}</p>
                            <div className={styles.actions}>
                                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                                    See
                                </Link>
                                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                                    Edit
                                </Link>
                                <button onClick={() => deleteDocument(post.id)}
                                    className="btn btn-outline">
                                    Delete
                                </button>
                            </div>

                        </div>)}
                </>
            )
            }

        </div>
    );
};

export default Dashboard;