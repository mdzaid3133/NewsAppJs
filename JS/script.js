let API_KEY = "991d7164f99245e687f3b92782290bac";
let initSize = 10;
let placeholdeImage = "https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180"
const container = document.querySelector("#container");
const moreBtn = document.querySelector('#moreBtn');
const searchBtn = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#searchInput')


async function fetchData(){

  let URL = `https://newsapi.org/v2/everything?q=apple&from=2024-03-11&to=2024-03-11&sortBy=popularity&pageSize=${initSize}&apiKey=991d7164f99245e687f3b92782290bac`
     try {
     let res = await fetch(URL)
     let data = await res.json()
      return data.articles
     } catch (error) {
        console.error(error)
        return [];
     }
  }

  function displayBlogs(articles){
 
      container.innerHTML = "";

    articles.forEach((blog)=>{
        let cardBlog = document.createElement('div');
        cardBlog.classList.add('card');
        let image = document.createElement('img');
        image.setAttribute("src", blog.urlToImage || placeholdeImage);
        let title = document.createElement('h2');
        let truncatedTitle = blog.title.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title;
        title.textContent = truncatedTitle;
        let desc = document.createElement('p');
        let drunckDesc = blog.description.length > 80 ? blog.description.slice(0, 80) + "..." : blog.description
        desc.textContent = drunckDesc
        cardBlog.appendChild(image);
        cardBlog.appendChild(title);
        cardBlog.appendChild(desc);
        cardBlog.addEventListener('click',()=>{
          window.open(blog.url, '_blank')
        })
        container.append(cardBlog);
    });
}

  

  (async ()=>{
    try {
        const artical = await fetchData();
        displayBlogs(artical);
    } catch (error) {
        console.error(error)
    }
  })();

  async function fetchQueeryData(query){
    let URL = `https://newsapi.org/v2/everything?q=${query}&from=2024-03-11&to=2024-03-11&sortBy=popularity&pageSize=${initSize}&apiKey=991d7164f99245e687f3b92782290bac`
       try {
       let res = await fetch(URL)
       let data = await res.json()
        return data.articles
       } catch (error) {
          console.error(error)
          return [];
       }
    }
 // https://newsapi.org/v2/everything?q
  searchBtn.addEventListener('click',async(e)=>{
    let query = searchInput.value;
    searchInput.value = ""
    //console.log(query)
    if(query !== "")
    try {
    let artical = await fetchQueeryData(query);
    console.log(artical)
    displayBlogs(artical);
    } catch (error) {
      alert('Query error!!!')
    }
  })
  moreBtn.addEventListener('click',async()=>{
    initSize = initSize * 2;
   let artical = await fetchData();
    console.log(artical)
    displayBlogs(artical)
     
   })
 