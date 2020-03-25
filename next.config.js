// console.log({
//     secret: process.env.secret,
//     id: process.env.id,
// })
// next.config.js
const withImages = require('next-images')
module.exports = withImages()


module.exports = withImages(
  {
    env: {
      secret: "J52RRBCMCEAY4HOIEZGXTDKZGKFA13NWKSWASG0WJAWSCHZ0",
      id: "L0ZK3VLIPIYJBRFHR2D421ZUPVBOEBUPMR5PQFKWDMT1UQJA",
      key: "pk.eyJ1IjoiYm9iYmlkaWdpIiwiYSI6ImNrN2pmMGZuYTAzY2MzbmxtbzRyYzk0amEifQ._rAmLPNij_hAnD-R7R3RmQ"
    },
}
)
