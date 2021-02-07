import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from './../axios/axios';


function SidebarComponent() {

    const [loading, setLoading] = useState();

    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        Api.get(`/wp/v2/categories`)
            .then(response => {
                setLoading(false);
                let data = response.data;
                setCategoryItems(data)
            })
    }, []);

    return (
        <div className="col-md-4">
            <div className="card my-4">
                <h5 className="card-header">Search</h5>
                <div className="card-body">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..." />
                        <span className="input-group-append">
                            <button className="btn btn-secondary" type="button">Go!</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="card my-4">
                <h5 className="card-header">Categories</h5>
                <div className="card-body">
                    <div className="row">
                        {
                            loading
                                ?
                                <div className="d-flex w-100 justify-content-center align-items-center">
                                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                                </div>
                                :
                                <>
                                    <div className="col-lg-6">
                                        <ul className="list-unstyled mb-0">
                                            {
                                                categoryItems.slice(0, 3).map(category => {
                                                    return (
                                                        <li key={category.id}>
                                                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul className="list-unstyled mb-0">
                                            {
                                                categoryItems.slice(3, 6).map(category => {
                                                    return (
                                                        <li key={category.id}>
                                                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponent;