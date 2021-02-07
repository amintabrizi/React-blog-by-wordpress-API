import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Api from '../axios/axios';

function SinglePostComponent(props) {

    const params = useParams();

    const [loading, setLoading] = useState();

    const [postItems, setPostItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        let isMounted = true;
        Api.get(`/wp/v2/posts?slug=${params.id}&_embed`)
            .then(
                response => {
                    setLoading(false);
                    if (isMounted) {
                        setPostItems(response.data)
                    }
                }
            )
            .catch(err => console.log(err))
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    }, [params.id])

    return (
        <div className="col-md-8">
            {
                loading
                    ?
                    <div className="d-flex  min-vh-100 w-100 justify-content-center align-items-center">
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
                                        </div>
                                        <div className="card-footer text-muted">
                                            posted on {post.date} by
                            <a href={authorURL}> {post._embedded.author[0].name}</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
            }


        </div>

    )
}

export default SinglePostComponent;