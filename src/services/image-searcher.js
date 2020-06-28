"use strict";

const qs = require("query-string");
const axios = require("axios");

/**
 * @description Image searcher based on google search engine platform
 * @deprecated TOO FUKING EXPENSIVE! IM BROKEN BITCH
 */
class imageSearcher {
  constructor(id, apiKey) {
    if (!id) {
      throw new Error("Expected a Custom Search Engine ID");
    }

    if (!apiKey) {
      throw new Error("Expected an API key");
    }

    this.endpoint = "https://imgur-apiv3.p.mashape.com";
    this.apiKey = apiKey;
    this.id = id;
  }

  search(query, options) {
    if (!query) {
      throw new Error("Expected a query");
    }

    const url = `${this.endpoint}/api/q?${this.buildQuery(
      query.trim(),
      options
    )}`;
    //console.log(url);
    return axios
      .get(url)
      .then(function(res) {
        const items = res.data.items || [];

        return items.map(item => ({
          type: item.mime,
          width: item.image.width,
          height: item.image.height,
          size: item.image.byteSize,
          url: item.link,
          thumbnail: {
            url: item.image.thumbnailLink,
            width: item.image.thumbnailWidth,
            height: item.image.thumbnailHeight
          },
          description: item.snippet,
          parentPage: item.image.contextLink
        }));
      })
      .catch(function(error) {
        throw error;
      });
  }

  buildQuery(query, options) {
    options = options || {};

    const result = {
      q: query.replace(/\s/g, "+"),
      searchType: "image",
      cx: this.id,
      key: this.apiKey
    };

    if (options.page) {
      result.start = options.page;
    }

    if (options.size) {
      result.imgSize = options.size;
    }

    if (options.type) {
      result.imgType = options.type;
    }

    if (options.dominantColor) {
      result.imgDominantColor = options.dominantColor;
    }

    if (options.colorType) {
      result.imgColorType = options.colorType;
    }

    if (options.safe) {
      result.safe = options.safe;
    }

    return qs.stringify(result);
  }
}

export default imageSearcher;
