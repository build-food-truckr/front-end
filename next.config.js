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
      secret: "CQIOOK32X4GCYDFNIEQIMGEICZNPBIDFPVXN4LIYD3WJWRGJ",
      id: "ILZU2VFG4PX0ITL5OEAUZ1DTUTKL2YZJ43Q0QDE3VFFFGNTI",
      key: "pk.eyJ1IjoiYm9iYmlkaWdpIiwiYSI6ImNrN2pmMGZuYTAzY2MzbmxtbzRyYzk0amEifQ._rAmLPNij_hAnD-R7R3RmQ"
    },
}
)
