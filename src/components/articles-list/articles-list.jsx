import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import './articles-list.scss';
import 'antd/dist/antd.css';
import {Pagination, Alert} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Article from "../article";

const ArticlesList = (props) => {

    const{ asyncGetArticles,
        articles,
        page,
        successfullDownload,
        error,
        asyncEstimateArticle,
        user,
        errorFavoritingArticle
    } = props;


    useEffect(() => {
        asyncGetArticles(user.token, 1);
    }, [user.token, asyncGetArticles]);

    if(!successfullDownload){
        return <LoadingOutlined className="spinner" spin />;
    }

    if(error){
        return <Alert className="alert" message="Sorry, articles not received" type="error"/>
    }

    const articleFavoriteHandler = user.token ? (isFavorite, articleSlug) => asyncEstimateArticle(user.token, articleSlug, isFavorite) : () => {};

    const elements = articles.map((article) => {
        return <Article key={article.slug}
                        articleFavoriteHandler={articleFavoriteHandler}
                        disableFavoritingArticle={!user.token}
                        errorFavoritingArticle={errorFavoritingArticle}
                        {...article}
                        isList
        />
    });
    return (

        <div>
            {elements}
            <Pagination current={page}
                        pageSize={10}
                        total={500}
                        showSizeChanger={false}
                        size="small"
                        className="pagination"
                        onChange={ (pages) => asyncGetArticles(user.token, pages)}
            />
        </div>
    )
}

ArticlesList.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.string,
        token: PropTypes.string,
    }).isRequired,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number.isRequired,
    successfullDownload: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorFavoritingArticle: PropTypes.bool.isRequired,
    asyncGetArticles: PropTypes.func.isRequired,
    asyncEstimateArticle: PropTypes.func.isRequired,
};

export default ArticlesList;