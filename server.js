let express = require('express')
let app = express()

app.set('view engine', 'ejs')

app.use('/assets',express.static('public'))

app.get('/', (request, response) => {
    response.render('pages/index', {test: 'Damienne'})
})



const random_wait_time = (waitTime = 300) => new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, Math.random() * waitTime)
  })
  
  
  const get_followers = async(userId, userFollowerCount) => {
    let userFollowers = [],
      batchCount = 20,
      actuallyFetched = 20,
      url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":"${batchCount}"}`
    while (userFollowerCount > 0) {
      const followersResponse = await fetch(url)
        .then(res => res.json())
        .then(res => {
          const nodeIds = []
          for (const node of res.data.user.edge_followed_by.edges) {
            nodeIds.push(node.node.id)
          }
          actuallyFetched = nodeIds.length;
          return {
            edges: nodeIds,
            endCursor: res.data.user.edge_followed_by.page_info.end_cursor
          }
        }).catch(err => {
          userFollowerCount = -1
          return {
            edges: []
          }
        })
      await random_wait_time()
      userFollowers = [...userFollowers, ...followersResponse.edges]
      userFollowerCount -= actuallyFetched
      url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":${batchCount},"after":"${followersResponse.endCursor}"}`
    }
    console.log(userFollowers)
    return userFollowers
  }

console.log(get_followers(7267243669, 10))

app.listen(2502)




/* const http = require("https");

const options = {
	"method": "GET",
	"hostname": "covid-19-data.p.rapidapi.com",
	"port": null,
	"path": "/totals",
	"headers": {
		"x-rapidapi-key": "1632b11b8amsh5d892a7d1c73fdep19210djsn35cac2f2fa82",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();

*/