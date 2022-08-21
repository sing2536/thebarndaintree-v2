const sharp = require('sharp');
const fs = require('fs');
const fsPromises = fs.promises;
const galleryDir = './public/gallery/'

async function resize() {
    let files = await fsPromises.readdir(galleryDir, { withFileTypes: true })
    let filter = files.filter((dirent) => dirent.isFile()).map(dirent => dirent.name)
    for (let i of filter){
        await sharp(`${galleryDir}${i}`)
            .resize({width: 500})
            .toFile(`./public/gallery/thumbnails/${i}`);
    }
}

resize()