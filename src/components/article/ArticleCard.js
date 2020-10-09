import React, {useContext} from "react"
import { ArticleContext } from "./ArticleProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ArticleCard = ({article}) => {
    const history = useHistory()
    const { articles, getArticles, addArticle, getArticleById, deleteArticle} = useContext(ArticleContext)

    return (
    <section className="article">
        <h3 className="article__title">{article.title}</h3>
        <div className="article_synopsis">Synopsis: {article.synopsis}</div>
        <div className="article_author">Author: {article.user.name}</div>
        <div className="article_date">Date: {article.dateAdded}</div>
        <div className="article_url">Url: {article.url}</div>
        <button onClick={
    			() => {
                    deleteArticle(article.id)
                    .then(() => {
                        history.push("/articles")
                        getArticles()
        		    })
    			}}>Delete Article
			</button>
    </section>
    )
}