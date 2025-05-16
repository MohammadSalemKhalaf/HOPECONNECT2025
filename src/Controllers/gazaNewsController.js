import axios from   "axios";

export const getArticles = async (req, res) => {
try{
const news = await axios.get(`https://newsapi.org/v2/everything?q=Gaza&apiKey=${process.env.NEWS_API_KEY}`); 
if(req.params.number){
  const articles = news.data.articles.slice(0,req.params.number);
  return res.status(200).json({articles})
}
else
{
  const articles = news.data.articles;
  return res.status(200).json({articles})
}}
catch (error) {
    res.status(500).json({ message: error.message });
  }

} 

export const getNumberOfArticles = async (req, res) => {
try{
const news = await axios.get(`https://newsapi.org/v2/everything?q=Gaza&apiKey=${process.env.NEWS_API_KEY}`); 
const articles = news.data.articles.slice(0,req.params.number);
return res.status(200).json({articles})
}
catch (error) {
    res.status(500).json({ message: error.message });
  }

} 
