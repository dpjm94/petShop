import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import Contact from './Contact';
import Search from './Search';
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { Row, Col } from 'antd';

const Home = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Pet Shop"
            description="Veterinary / Pet Catalog"
        >
            <div className="wrapper wrapper__no-padding">
            
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                <CheckBox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                </Col>
                <Col lg={12} xs={24}>
                <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                </Col>
            </Row>
            </div>
            {/* <Search /> */}
            <br />
            <div className="wrapper wrapper__no-padding">
             <div className="row row--gutters-small">
                 {filteredResults.map((product, i) => (
                    <div key={i} >
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <br />
            <hr />
            <br />
                {loadMoreButton()}
            </div>
            <Contact />
        </Layout>
    );
};

export default Home;
