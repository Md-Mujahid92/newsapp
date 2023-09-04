import React, { useEffect, useState } from "react";
import NewsItem from "./newsitem/news-item";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  

  const capitalFirst = (a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  };

  const updateNews = async () => {
    document.title = `${capitalFirst(props.category)} - NewsApe`;
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f3151fc2ddbe49a4960a4e35d6dbc5ee&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticle(parseData.articles);
    setTotalResult(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles))
    setTotalResult(parseData.totalResults)
    setLoading(false)
  };

  return (
    <>
      <h1 className="text-center" style={{marginTop: '90px'}}>
        NewsApe - Top {capitalFirst(props.category)} Headline
      </h1>
      <p className="text-center">
        {loading && <Spinner animation="grow" />}
      </p>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResult}
        loader={
          <p className="text-center">
            <Spinner animation="grow" />
          </p>
        }
      >
        <div className="container my-3">
          <div className="row">
            {article.map((value) => {
              return (
                <div className="col-md-3" key={value.url}>
                  <NewsItem
                    title={!value.title ? "" : value.title.slice(0, 45)}
                    description={
                      !value.description ? "" : value.description.slice(0, 88)
                    }
                    imageUrl={
                      !value.urlToImage ? "/newsApe.svg" : value.urlToImage
                    }
                    newsUrl={value.url}
                    author={value.author}
                    date={value.publishedAt}
                    source={value.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
