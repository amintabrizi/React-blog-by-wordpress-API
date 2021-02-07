import { useState, useEffect } from "react";
import Api from './../axios/axios';
import { Link, useParams } from "react-router-dom";

function PostsComponent() {

    const params = useParams();

    const [loading, setLoading] = useState();

    const [postItems, setPostItems] = useState([]);

    const [pageNumber, setPageNumber] = useState(
        params.id ? params.id : parseInt(1)
    )

    useEffect(() => {
        setLoading(true);
        Api.get(`/wp/v2/posts?per_page=5&page=${pageNumber}&_embed`)
            .then(response => {
                setLoading(false);
                let data = response.data;
                setPostItems(data);
                window.scrollTo(0,0);
            })
    }, [pageNumber]);


    const newerLoadingPosts = () => {
        setPageNumber(pageNumber + 1)
    }

    const olderLoadingPosts = () => {
        if (!pageNumber < 2) {
            console.log(pageNumber);
            setPageNumber(pageNumber - 1)
        }

    }

    return (
        <div className="col-md-8">
            {
                loading
                    ?
                    <div className="d-flex min-vh-100 justify-content-center align-items-center">
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                    </div>
                    :
                    <>
                        {
                            postItems.map(post => {
                                let authorURL = post._embedded.author[0].link;

                                authorURL = authorURL.replace("http://127.0.0.1/wordpress/wp-json/wp/v2", "")
                                return (
                                    <div key={post.id} className="card mb-4">
                                        {
                                            post.fimg_url
                                                ?
                                                <img className="card-img-top" src={post.fimg_url} alt="1" />
                                                :
                                                ''
                                        }
                                        <div className="card-body">
                                            <h2 className="card-title">{post.title.rendered}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                                            <Link to={`/post/${post.slug}`} className="btn btn-primary">Read More &rarr;</Link>
                                        </div>
                                        <div className="card-footer text-muted">
                                            Posted on {post.date} by
                            <Link to={authorURL}> {post._embedded.author[0].name}</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <ul className="pagination justify-content-center mb-4">
                            <li className="page-item">
                                <Link className="page-link" to={{ pathname: `/page/${pageNumber + 1}` }} onClick={newerLoadingPosts}>Newer &rarr;</Link>
                            </li>
                            {
                                pageNumber < 2
                                    ? ''
                                    : <li className="page-item">
                                        <Link className="page-link" to={{ pathname: `/page/${pageNumber - 1}` }} onClick={olderLoadingPosts}>&larr; Older</Link>
                                    </li>
                            }

                        </ul>
                    </>
            }
        </div>

    )
}

export default PostsComponent;