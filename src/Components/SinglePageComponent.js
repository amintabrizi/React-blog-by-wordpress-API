import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Api from '../axios/axios';

function SinglePageComponent(props) {

    const params = useParams();

    const [loading, setLoading] = useState();

    const [pageItems, setPageItems] = useState([]);

    const PageSlug = params.id;

    useEffect(() => {
        setLoading(true);
        let isMounted = true;
        Api.get(`/wp/v2/pages?slug=${params.id}&_embed`)
            .then(
                response => {
                    setLoading(false);
                    if (isMounted) {
                        setPageItems(response.data)
                    }
                }
            )
            .catch(err => console.log(err))
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    }, [PageSlug, params.id])

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
                            pageItems.map(page => {
                                let authorURL = page._embedded.author[0].link;

                                authorURL = authorURL.replace("http://127.0.0.1/wordpress/wp-json/wp/v2", "")
                                return (
                                    <div key={page.id} className="card mb-4">
                                        {
                                            page.fimg_url
                                                ?
                                                <img className="card-img-top" src={page.fimg_url} alt="1" />
                                                :
                                                ''
                                        }
                                        <div className="card-body">
                                            <h2 className="card-title">{page.title.rendered}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                                        </div>
                                        <div className="card-footer text-muted">
                                            posted on {page.date} by
                            <a href={authorURL}> {page._embedded.author[0].name}</a>
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

export default SinglePageComponent;