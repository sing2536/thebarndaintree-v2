const sharp = require("sharp")
const fs = require("fs")
const fsPromises = fs.promises
const galleryDir = "../public/images/gallery/"

async function resize() {
    let files = await fsPromises.readdir(galleryDir, { withFileTypes: true })
    let filter = files
        .filter((dirent) => dirent.isFile())
        .filter((dirent) => /\.(jpg|jpeg|png|gif)$/i.test(dirent.name))
        .map((dirent) => dirent.name)
    for (let i of filter) {
        console.log(`${galleryDir}${i}`)
        await sharp(`${galleryDir}${i}`)
            .resize({ width: 500 })
            .toFile(`../public/images/gallery/thumbnails/${i}`)
    }
}

resize()
