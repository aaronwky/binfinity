const searchForm = document.getElementById('searchForm');
    const apiKey = '736138ef205d404da6674175001e8b2e'; // Replace with your NewsAPI key
    const newsContainer = document.getElementById('newsContainer');

    searchForm.addEventListener('submit', retrieveData);

    function retrieveData(e) {
      e.preventDefault();

      const url = `https://newsapi.org/v2/everything?q=sustainability&apiKey=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          console.log(data);
          populateNews(data.articles);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    function populateNews(articles) {
      newsContainer.innerHTML = ''; // Clear existing content

      articles.forEach((article) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-md-6'; // Bootstrap grid class for 2 columns

        const articleContent = document.createElement('div');
        articleContent.className = 'article';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = article.urlToImage;

        const title = document.createElement('h5');
        title.textContent = article.title;

        const author = document.createElement('p');
        author.textContent = 'Author: ' + (article.author ? article.author : 'Unknown');

        const publishedAt = document.createElement('p');
        publishedAt.textContent = 'Published At: ' + new Date(article.publishedAt).toLocaleDateString();

        imgContainer.appendChild(img);
        articleContent.appendChild(imgContainer);
        articleContent.appendChild(title);
        articleContent.appendChild(author);
        articleContent.appendChild(publishedAt);

        // Create a link to the article's website
        const visitLink = document.createElement('a');
        visitLink.className = 'btn';
        visitLink.textContent = 'Visit news website';
        visitLink.href = article.url;
        visitLink.target = '_blank';

        articleContent.appendChild(visitLink);

        articleDiv.appendChild(articleContent);
        newsContainer.appendChild(articleDiv);
      });
    }