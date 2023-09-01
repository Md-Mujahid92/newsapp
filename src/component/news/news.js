import React, { Component } from "react";
import NewsItem from "./newsitem/news-item";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalFirst = (a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResult: 0,
    };
    document.title = `${this.capitalFirst(this.props.category)} - NewsApe`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f3151fc2ddbe49a4960a4e35d6dbc5ee&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f3151fc2ddbe49a4960a4e35d6dbc5ee&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      article: this.state.article.concat(parseData.articles),
      totalResult: parseData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-5">
          NewsApe - Top {this.capitalFirst(this.props.category)} Headline
        </h1>
        <p className="text-center">
          {this.state.loading && <Spinner animation="grow" />}
        </p>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResult}
          loader={
            <p className="text-center">
              <Spinner animation="grow" />
            </p>
          }
        >
          <div className="container my-3">
            <div className="row">
              {this.state.article.map((value) => {
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
  }
}

export default News;

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
