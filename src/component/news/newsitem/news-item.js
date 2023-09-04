import React, { Component } from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="d-flex justify-content-end position-absolute end-0">
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl}
          className="card-img-top"
          alt="NewApe"
          style={{ width: "18rem", height: "10rem", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              by {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
